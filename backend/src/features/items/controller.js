import z, { ZodError } from "zod";
import service from "./service.js";
import categoryService from "../category/service.js";

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
const createItem = async (req, res) => {
  try {
    const reqBody = req.body;
    const verifiedPayload = z
      .object({
        name: z.string().min(1).nonempty(),
        price: z.number().min(1).positive(),
        categoryName: z.string().min(1).nonempty(),
      })
      .parse(reqBody);

    const { name, price, categoryName } = verifiedPayload;

    const isItemExisted = await service.getItemByName(name);

    if (isItemExisted)
      return res
        .json({ message: "Item already existed.", data: null })
        .status(409);

    const category = await categoryService.getCategoryByName(categoryName);

    if (category !== null) {
      const item = await service.createItem(name, price, category.id);
      return res.json({ message: "Item created", data: item }).status(201);
    }
    const createdCategory = await categoryService.createCategory(categoryName);
    const item = await service.createItem(name, price, createdCategory.id);

    return res.json({ message: "Item created", data: item }).status(201);
  } catch (error) {
    if (error instanceof ZodError)
      return res
        .json(ZodErrorResponse)
        .status(400);
    if (error instanceof Error)
      return res
        .json(ErrorResponse)
        .status(500);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const getItemById = async (req, res) => {
  try {
    const pathVariable = req.params.id;
    const verifiedId = z.string().nonempty().parse(pathVariable);

    const existedItem = await service.getItemById(verifiedId);

    if (!existedItem)
      return res.json({ message: "Item not found.", data: null }).status(404);

    return res.json({ message: "Item found.", data: existedItem }).status(200);
  } catch (error) {
    if (error instanceof ZodError) return res.json(ZodErrorResponse).status(400);
    if (error instanceof Error) return res.json(ErrorResponse).status(500);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const getAllItems = async (req, res) => {
  try {
    const items = await service.getAllItems();
    return res
      .json({
        message: "All items",
        data: items,
      })
      .status(200);
  } catch (error) {
    return res
      .json(ErrorResponse)
      .status(500);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const updateItem = async (req, res) => {
  try {
    const reqBody = req.body;
    const pathVariable = req.params.id;

    const verifiedPayload = z
      .object({
        name: z.string().nonempty(),
        price: z.number().min(0.1).positive(),
      })
      .parse(reqBody);

    const { name, price } = verifiedPayload;

    const verifiedId = z.string().nonempty().parse(pathVariable);

    const foundItem = await service.getItemById(verifiedId);

    if (!foundItem)
      return res.json({ message: "Item not found.", data: null }).status(404);

    const updatedItem = await service.updateItem(name, price, verifiedId);

    return res.json({ message: "Item updated", data: updatedItem }).status(200);
  } catch (error) {
    if (error instanceof ZodError)
      return res.json(ZodErrorResponse).status(400);
    if (error instanceof Error)
      return res
        .json(ErrorResponse)
        .status(500);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>}
 */
const deleteItemById = async (req, res) => {
  try {
    const pathVariable = req.params.id;
    const verifiedId = z.string().nonempty().parse(pathVariable);

    const foundItem = await service.getItemById(verifiedId);

    if (!foundItem) return res.json({ message: "Item not found" }).status(404);

    await service.deleteItemById(foundItem.id);

    return res.json({ message: "Item deleted." }).status(200);
  } catch (error) {
    if (error instanceof ZodError)
      return res.json(ZodErrorResponse).status(400);
    if (error instanceof Error)
      return res
        .json(ErrorResponse)
        .status(500);
  }
};

const controllers = {
  createItem,
  getItemById,
  getAllItems,
  deleteItemById,
  updateItem,
};

export default controllers;