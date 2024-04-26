// A very nice generic CRUD for Prisma models

const allowedSelect = ["select", "include", "where"];

/**
 * Better tryparse.
 * @param {*} number variable which should be evaluated
 * @param {*} name name of the variable to error message
 * @param {*} res response for serverError
 * @returns true if its valid, otherwise serverError
 */
function parseNumberElseError(number, name, res) {
  if (!parseInt(number)) {
    return (
      false,
      serverError(
        res,
        "Invalid page provided",
        "Bad request, do you have " + name + " in correct format?",
        400
      )
    );
  }
  return true;
}

/**
 * Checks if already exists unique fields in model.
 * @param {*} model
 * @param {*} fields
 * @param {*} res
 * @returns
 */
async function checkUniqueFields(model, fields, req, res) {
  console.log("unique fields", fields);
  let errors = [];
  for (let field in fields) {
    console.log("field", { [fields[field]]: req.body[fields[field]] });
    let fetched = await model.findMany({
      where: { [fields[field]]: req.body[fields[field]] },
    });
    console.log("fetched", fetched);
    if (fetched.length !== 0) {
      errors.push({ [fields[field]]: req.body[fields[field]] });
    }
  }
  if (errors.length !== 0) {
    console.log("errors is not null so cajk", errors);
    return (
      false,
      serverError(
        res,
        "Unique fields already exists",
        { message: "Unique fields already exists", errors },
        403
      )
    );
  }
  return true;
}

/**
 * Parses query from request.
 * not sure how its working even if its working
 * anyway it doesnt like pagination input //TODO mby add it to it not sure
 *
 * @param {*} query query from request
 *
 * example query: planets?name=equals:AA - finds planets with name AA
 *
 * where name is searched field
 *
 * all options:
 *
 *   equals?: String | StringFieldRefInput,
 *   in?: String[],
 *   notIn?: String[],
 *   lt?: String | StringFieldRefInput,
 *   lte?: String | StringFieldRefInput,
 *   gt?: String | StringFieldRefInput,
 *   gte?: String | StringFieldRefInput,
 *   contains?: String | StringFieldRefInput,
 *   startsWith?: String | StringFieldRefInput,
 *   endsWith?: String | StringFieldRefInput,
 *   not?: String | NestedStringFilter
 *
 *
 * @param {*} res response object
 * @returns object with select, include and where
 */
export function parseQuery(query, res) {
  //parse select
  if (Object.keys(query).length === 0) {
    return {};
  }

  if (query.select && query.include) {
    //console.error("Invalid query");
    serverError(
      res,
      "Invalid query",
      "You can't use select and include at the same time",
      400
    );
    return false;
  }

  console.log("query", query);

  //magic go brrrrrrrrrrr
  let select = Array.isArray(query.select)
    ? query.select.reduce((obj, key) => ({ ...obj, [key]: true }), {})
    : query.select
    ? { [query.select]: true }
    : {};
  delete query.select;
  console.log("select", select);

  let include = Array.isArray(query.include)
    ? query.include.reduce((obj, key) => ({ ...obj, [key]: true }), {})
    : query.include
    ? { [query.include]: true }
    : {};
  delete query.include;
  console.log("include", include);

  //parse where
  let where = {};

  Object.entries(query).forEach(([key, element]) => {
    console.log("key and element:", key, element);
    if (!Array.isArray(element)) {
      let [operator, value] = element.split(":");
      console.log("operator and value", operator, value);
      if (!where[key]) where[key] = {};
      if (!where[key][operator]) where[key][operator] = {};
      where[key][operator] = value;
      return;
    }
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
    ...(Object.keys(include).length > 0 && { include }),
    ...(Object.keys(select).length > 0 && { select }),
    ...(Object.keys(where).length > 0 && { where }),
  };
}

/**
 * Parses pagination from query.
 * @param {*} query query from request
 * @returns object with page, pageSize and orderBy
 */
export function parsePagination(query) {
  var page = query.page || 1;
  var pageSize = query.pageSize || 5;
  const orderBy = query.orderBy || { id: "asc" };

  delete query.page;
  delete query.pageSize;
  delete query.orderBy;

  // todo order by parsing?

  if (!parseNumberElseError(page, "page")) return;
  if (!parseNumberElseError(pageSize, "pageSize")) return;

  page = parseInt(page);
  pageSize = parseInt(pageSize);

  return {
    page,
    pageSize,
    orderBy,
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
  console.error(e);
  res.json({ error: message }).status(status);
}

/**
 * Check if there are required fields in body of request.
 * @param {*} requiredFields
 * @param {*} request
 * @param {*} response
 * @returns true if all required fields are present, otherwise response.status(400) with missing fields
 */
function hasRequiredFields(requiredFields, request, response) {
  //return requiredFields.every((field) => data[field]);
  var errors = [];
  for (let field of requiredFields) {
    console.log("hasRequired fields field", field);
    if (!request.body.hasOwnProperty(field)) {
      errors.push(field);
    }
  }
  if (errors.length > 0) {
    return (
      false,
      response.status(400).json({
        error: "Item not created, missing required fields",
        missingFields: errors,
      })
    );
  }
  return true;
}

//TODO test this fckng shit with something bcs im going insane
/**
 * Checks if provided fields are valid against model from prisma. //TODO not against model rather predefined allowed fields
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
    //console.error("Invalid key in fields");
    //console.error(key);
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
    response.status(400).json({
      error: "Invalid fields in where clause",
      invalidFields: errors,
      acceptedFields: allowedFields,
    });
    return false;
  }
  return true;
}

/**
 * Returns a 404 error for an item not found.
 * @param {Object} res - The response object.
 * @param {number} id - The id of the item not found.
 * @returns {Object} The response object with a 404 status.
 */
function notFoundError(res, id) {
  serverError(
    res,
    "id with value " + id + " not found",
    "Item with id {" + id + "} not found",
    404
  );
}

/**
 * Checks if an item exists in a model.
 * @param {number} id - The id of the item to check.
 * @param {Object} model - The model to check the item in.
 * @param {Object} [optionals] - Optional parameters for the query.
 * @returns {Object} The item if it exists, otherwise null.
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
 * Gets an item by id from a model.
 * @param {Object} model - The model to get the item from.
 * @param {Object} [optionals] - Optional parameters for the query.
 * @returns {Function} A function to be used in a route.
 */
export const getById =
  (model, optionals = null) =>
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!parseNumberElseError(id, "id", res)) return;

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

/**
 * Gets all items from a model.
 * @param {Object} model - The model to get items from.
 * @param {Object} [optionals] - Optional parameters for the query.
 * @param {string} [orderBy] - The field to order the items by.
 * @param {number} [page=1] - The page number to get.
 * @param {number} [pageSize=10] - The number of items per page.
 * @returns {Function} A function to be used in a route.
 */
export const getAll =
  (
    model,
    optionals = null,
    paginationParams = {
      page: 1,
      pageSize: 10,
      orderBy: { id: "asc" },
    }
  ) =>
  async (req, res) => {
    try {
      const totalItems = await model.count(); //TODO real count

      let { page, pageSize, orderBy } = paginationParams;

      if (pageSize > totalItems) pageSize = totalItems;
      if (pageSize == -1) pageSize = totalItems;

      const items = await model.findMany({
        ...optionals,
        orderBy: orderBy,
        skip: page * pageSize - pageSize,
        take: pageSize,
      });
      res.json({
        totalItems: totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        items: items,
      });
    } catch (error) {
      serverError(res, error);
    }
  };

/**
 * Creates a new item in a model.
 * @param {Object} model - The model to create the item in.
 * @param {string[]} requiredFields - The required fields for the item.
 * @param {string[]} [uniqueFields=["name"]] - The unique fields for the item.
 *
 * This is also discusitng so long as i dont know how to fetch @ unique fields form prisma schema
 * @returns {Function} A function to be used in a route.
 */
export const create =
  (model, requiredFields, uniqueFields = ["name"]) =>
  async (req, res) => {
    try {
      if (!(await hasRequiredFields(requiredFields, req, res))) return;
      if (!(await checkUniqueFields(model, uniqueFields, req, res))) return;

      const item = await model.create({
        data: req.body,
      });
      res.json(item).status(201);
    } catch (error) {
      console.error("ERROR:", error);
      serverError(res, error);
    }
  };

/**
 * Updates an item in a model.
 * @param {Object} model - The model to update the item in.
 * @param {string[]} requiredFields - The required fields for the item.
 * @returns {Function} A function to be used in a route.
 */
export const update = (model, requiredFields) => async (req, res) => {
  requiredFields.push("id");
  console.log("req.body", req.body);
  try {
    if (!hasRequiredFields(requiredFields, req, res)) {
      return;
    }

    const { id } = req.params;
    if (!parseInt(id)) {
      return serverError(
        res,
        "Invalid id type provided",
        "Bad request, do you have ID in the correct format?",
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

/**
 * Removes an item from a model.
 * @param {Object} model - The model to remove the item from.
 * @returns {Function} A function to be used in a route.
 */
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
        id: parseInt(id),
      },
    });

    //also not sure if isnt better idea to return res.status(204).send();
    res.json(item).status(204);
  } catch (error) {
    serverError(res, error);
  }
};
