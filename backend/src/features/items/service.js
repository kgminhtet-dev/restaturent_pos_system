import prisma from "../../prisma.js";

const findAllItems = async () => {
  return await prisma.item.findMany();
};

const findItemById = async (id) => {
  return await prisma.item.findFirst({ where: { id: id } });
};

const findItemByName = async (itemName) => {
  return await prisma.item.findFirst({ where: { name: itemName } });
};

const createItem = async (name, price, categoryId) => {
  return await prisma.item.create({
    data: {
      name: name,
      price: price,
      available: true,
      category: {
        connect: {
          id: categoryId,
        },
      },
      createdAt: new Date(),
    },
  });
};

const updateItem = async (name, price, itemId) => {
  return await prisma.item.update({
    where: { id: itemId },
    data: {
      name: name,
      price: price,
    },
  });
};

const deleteItemById = async (id) => {
  await prisma.item.delete({ where: { id: id } });
};

export default {
  getAllItems: findAllItems,
  getItemById: findItemById,
  getItemByName: findItemByName,
  createItem,
  updateItem,
  deleteItemById,
};
