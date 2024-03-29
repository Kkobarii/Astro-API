// A very nice generic CRUD for Prisma models

export const getById = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const item = await model.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    console.log(id, item);
    res.json(item);
  } catch (error) {
    res.json({ error: "Item not found" });
  }
};

export const getAll = (model) => async (req, res) => {
  try {
    const items = await model.findMany();
    res.json(items);
  } catch (error) {
    res.json({ error: "Items not found" });
  }
};

export const create = (model) => async (req, res) => {
  try {
    const item = await model.create({
      data: req.body,
    });
    res.json(item);
  } catch (error) {
    res.json({ error: "Item not created" });
  }
};

export const update = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const item = await model.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res.json(item);
  } catch (error) {
    res.json({ error: "Item not updated" });
  }
};

export const remove = (model) => async (req, res) => {
  const { id } = req.params;
  try {
    const item = await model.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(item);
  } catch (error) {
    res.json({ error: "Item not deleted" });
  }
};
