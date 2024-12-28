import prisma from "../../prisma.js";

const createTable = async (tblNumber) => {
  return prisma.table.create({
    data: {
      number: tblNumber,
    },
  });
};

const findTableByNumber = async (tblNumber) => {
  return prisma.table.findFirst({
    where: {
      number: parseInt(tblNumber),
    },
  });
};

const findTableById = async (id) => {
  return prisma.table.findFirst({ where: { id: id } });
};

const getAllTables = async () => {
  return prisma.table.findMany();
};

const deleteTableById = async (id) => {
  await prisma.table.delete({ where: { id: id } });
};

const updateTable = async (id, tblNumber) => {
  return prisma.table.update({
    where: {
      id: id,
    },
    data: {
      number: tblNumber,
    },
  });
};

export default {
  createTable,
  findTableByNumber,
  findTableById,
  getAllTables,
  deleteTableById,
  updateTable,
};
