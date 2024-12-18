import service from "./service.js";

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
async function getItems(req, res) {
  const items = await service.getItems();
  res.setHeader("Content-Type", "application/json");
  res.json({ items });
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
async function createItem(req, res) {
  const item = req.body;
  const items = await service.createItem(item);
  res.setHeader("Content-Type", "application/json");
  res.json({ items });
}

export default {
  getItems,
  createItem,
};
