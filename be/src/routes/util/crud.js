// A very nice generic CRUD for Prisma models

const allowedSelect = ["select", "include", "where"];

export function parseQuery(query) {
  //parse select
  if (!query) {
    return null;
  }

  let select = {};
  query.select.forEach((element) => {
    select[element] = true;
  });
  delete query.select;

  //parse where
  let where = {};

  Object.entries(query).forEach(([key, element]) => {
    console.log("key and element:", key, element);
    element.forEach((element) => {
      let [operator, value] = element.split(":");
      console.log("operator and value", operator, value);
      if (!where[key]) where[key] = {};

      if (!where[key][operator]) where[key][operator] = {};
      where[key][operator] = value;
    });
  });
  console.log("where", where);

  return {
    ...(Object.keys(select).length > 0 && { select }),
    ...(Object.keys(where).length > 0 && { where }),
  };
}

/**
 * classical server error 500
 *
 * prints error to console and returns 500 status
 * @param {*} res
 * @param {*} e
 * @param {*} message optional message to send to client (default: "Internal Server error")
 * @param {*} status optional status to send to client (default: 500)
 */
function serverError(res, e, message = "Internal Server error", status = 500) {
  // i mean this is useless
  // fs.appendFile("error.log", e, (err) => {
  //   if (err) {
  //     console.error("Error writing to log file");
  //     throw err;
  //   }
  // });
  console.error(e);
  res.json({ error: message }).status(status);
}

/**
 * check if there are required fields in body of request
 * @param {*} requiredFields
 * @param {*} request
 * @param {*} response
 * @returns true if all required fields are present, otherwise response.status(400) with missing fields
 */
function hasRequiredFields(requiredFields, request, response) {
  //return requiredFields.every((field) => data[field]);
  var errors = [];
  for (let field of requiredFields) {
    if (!request.body.hasOwnProperty(field)) {
      errors.push(field);
    }
  }
  if (errors.length > 0) {
    return response.status(400).json({
      error: "Item not created, missing required fields",
      missingFields: errors,
    });
  }
  return true;
}

//TODO test this fckng shit with something bcs im going insane
/**
 * checks if provided fields are valid against model from prisma //TODO not against model rather predefined allowed fields
 * @param {*} allowedFields allowed fields
 * @param {*} fields fields to check
 * @param {*} response response object
 * @returns true if all fields are valid, otherwise response.status(400) with invalid fields
 */
export function checkFields(allowedFields, fields, response) {
  if (!fields) {
    return true;
  }
  // filter to have only select and so on
  let filteredDict = {};
  for (let key in fields) {
    if (allowedSelect.includes(key)) {
      filteredDict[key] = fields[key];
      continue;
    }
    console.error("Invalid key in fields");
    console.error(key);
  }

  //expected input should be like that:
  // {
  //  select: {id: true, name: true},
  //  include: {resources: true},
  //  where: {id: 1}
  // }

  let errors = [];
  for (let keyword in filteredDict) {
    for (let field in filteredDict[keyword]) {
      if (!allowedFields.includes(field)) {
        errors.push(field);
      }
    }
  }
  if (errors.length > 0) {
    return response.status(400).json({
      error: "Invalid fields in where clause",
      invalidFields: errors,
      acceptedFields: allowedFields,
    });
  }
  return true;
}

function notFoundError(res, id) {
  serverError(
    res,
    "id with value " + id + " not found",
    "Item with id {" + id + "} not found",
    404
  );
}

/**
 * check if item exists in model
 * @param {*} id must be INT
 * @param {*} model
 * @returns object if found, null if not found (idk if null if not found)
 */
function itemExists(id, model, optionals = null) {
  console.log("optionals", optionals);

  return model.findUnique({
    where: {
      id: parseInt(id),
    },
    ...optionals,
  });
}

/**
 *
 * @param {*} model
 * @param {*} optionals
 * @param {*} req id is getting from req.params but
 * @param {*} res
 * @returns
 */
export const getById =
  (model, optionals = null) =>
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!parseInt(id)) {
        return serverError(
          res,
          "Invalid id type provided, id not int",
          "Bad request, do you have ID in correct format?",
          400
        );
      }

      const item = await itemExists(id, model, optionals);

      if (!item) {
        return notFoundError(res, id);
      }

      console.log(id, item);
      return res.json(item);
    } catch (error) {
      return serverError(res, error);
    }
  };

export const getAll =
  (model, optionals = null, orderBy = { id: "asc" }, page = 1, pageSize = 5) =>
  async (req, res) => {
    try {
      const totalItems = await model.count();
      const items = await model.findMany({
        ...optionals,
        orderBy: orderBy,
        skip: page * pageSize - pageSize,
        take: pageSize,
      });
      res.json({
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
        currentPage: page,
        pageSize: pageSize,
        items: items,
      });
    } catch (error) {
      serverError(res, error);
    }
  };

export const create = (model, requiredFields) => async (req, res) => {
  try {
    if (!hasRequiredFields(requiredFields, req, res)) {
      return;
    }
    const item = await model.create({
      data: req.body,
    });
    res.json(item).status(201);
  } catch (error) {
    serverError(res, error);
  }
};

export const update = (model, requiredFields) => async (req, res) => {
  try {
    if (!hasRequiredFields(requiredFields, req, res)) {
      return;
    }

    const { id } = req.params;
    if (!parseInt(id)) {
      return serverError(
        res,
        "Invalid id type provided",
        "Bad request, do you have ID in correct format?",
        400
      );
    }

    //not sure if this works pls test it
    if (!(await itemExists(id, model))) {
      return notFoundError(res, id);
    }

    const item = await model.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });

    res.json(item).status(200);
  } catch (error) {
    serverError(res, error);
  }
};

export const remove = (model) => async (req, res) => {
  try {
    const { id } = req.params;
    if (!parseInt(id)) {
      return serverError(
        res,
        "Invalid id type provided",
        "Bad request, do you have ID in correct format?",
        400
      );
    }

    //not sure if this works pls test it
    if (!(await itemExists(id, model))) {
      return notFoundError(res, id);
    }

    const item = await model.delete({
      where: {
        id: id,
      },
    });

    //also not sure if isnt better idea to return res.status(204).send();
    res.json(item).status(204);
  } catch (error) {
    serverError(res, error);
  }
};
