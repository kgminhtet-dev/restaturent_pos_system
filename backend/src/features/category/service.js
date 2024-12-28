import prisma from "../../prisma.js";

const createCategory = async (name) => {
  return await prisma.category.create({
    data: {
      name: name.toLowerCase(),
      createdAt: new Date(),
    },
  });
};

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

const getCategoryById = async (id) => {
  return await prisma.category.findFirst({ where: { id: id } });
};

const updateCategory = async (name, price, categoryId) => {
  return await prisma.category.update({
    where: { id: categoryId },
    data: {
      name: name,
      price: price,
    },
  });
};

const getCategoryByName = async (categoryName) => {
  return await prisma.category.findFirst({ where: { name: categoryName } });
};

const deleteCategoryById = async (id) => {
  await prisma.category.delete({ where: { id: id } });
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  getCategoryByName,
  deleteCategoryById,
};
