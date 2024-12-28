import service from "./service.js";


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
export const getAllCategories = async (req, res) => {
  try {
    const categories = await service.getAllCategories();
    return res
      .json({ message: "All categories", data: categories })
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
export const getCategoryById = async (req, res) => {
  try {
    const pathVariable = req.params.id;
    const verifiedId = z.string().nonempty().parse(pathVariable);

    const existedCategory = await service.getCategoryById(verifiedId);

    if (!existedCategory)
      return res
        .json({ message: "Category not found.", data: null })
        .status(404);

    return res
      .json({ message: "Category found.", data: existedCategory })
      .status(200);
  } catch (error) {
    if (error instanceof ZodError)
      return res.json(ZodErrorResponse).status(400);
    if (error instanceof axiosError)
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
export const deleteCategory = async (req, res) => {
  try {
    const pathVariable = req.params.id;
    const verifiedId = z.string().nonempty().parse(pathVariable);

    const existedCategory = await service.getCategoryById(verifiedId);

    if (!existedCategory)
      return res
        .json({ message: "Category not found.", data: null })
        .status(404);

    await service.deleteCategoryById(verifiedId);

    return res.json({ message: "Category deleted.", data: null }).status(200);
  } catch (error) {
    if (error instanceof axiosError)
      return res.json(ZodErrorResponse).status(400);
    if (error instanceof axiosError)
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
export default {
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
