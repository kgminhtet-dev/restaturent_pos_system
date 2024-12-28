import { ZodError } from "zod";
import service from "./service.js";
import z from "zod";

const ZodErrorResponse = {
  message: "Bad request",
  data: null,
};

const ErrorResponse = {
  message: "Internal Server Error",
  data: null,
};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */

const createTable = async (req, res) => {
  try {
    const tblNumber = req.params.number;
    const table = await service.findTableByNumber(tblNumber);

    if (table)
      return res
        .json({ message: "Table already existed.", data: null })
        .status(409);

    const createdTable = await service.createTable(parseInt(tblNumber));

    return res
      .json({ message: "Table created.", data: createdTable })
      .status(201);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.json(ErrorResponse).status(500);
    }
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const getAllTables = async (req, res) => {
  try {
    const tables = await service.getAllTables();

    return res.json({ message: "Success", data: tables }).status(200);
  } catch (error) {
    if (error instanceof Error) return res.json(ErrorResponse).status(500);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const deleteTableById = async (req, res) => {
  try {
    const id = req.params.id;

    await service.deleteTableById(id);

    return res.json({ message: "Table deleted", data: null }).status(200);
  } catch (error) {
    if (error instanceof Error) return res.json(ErrorResponse).status(500);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const updateTable = async (req, res) => {
  try {
    const id = req.params.id;
    const reqBody = req.body;

    const verifiedPayload = z
      .object({ number: z.number().min(1) })
      .parse(reqBody);

    const { number: newTableNumber } = verifiedPayload;

    const isTableExisted = await service.findTableById(id);

    if (!isTableExisted)
      return res
        .json({
          message: "Table not found",
          data: null,
        })
        .status(404);

    const isNewTableNumberExisted = await service.findTableByNumber(
      newTableNumber
    );

    if (isNewTableNumberExisted)
      return res
        .json({
          message: `Table with numbe ${newTableNumber} can't be used.`,
          data: null,
        })
        .status(409);

    const updated = await service.updateTable(id, newTableNumber);

    return res.json({ message: "Table updated.", data: updated }).status(200);
  } catch (error) {
    if (error instanceof ZodError)
      return res.json(ZodErrorResponse).status(400);
    if (error instanceof Error) return res.json(ErrorResponse).status(500);
  }
};

export default {
  createTable,
  getAllTables,
  updateTable,
  deleteTableById,
};
