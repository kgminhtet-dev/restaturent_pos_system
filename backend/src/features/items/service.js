import database from "../../prisma.js";

async function getItems() {
  return database.item.findMany();
}

async function createItem(item) {
  return database.item.create({ data: item });
}

export default {
  getItems,
  createItem,
};
