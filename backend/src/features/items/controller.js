import prisma from "../../prisma.js";
import z, { date, ZodError } from "zod";

const createItem = async (req, res) => {
  try {
    const reqBody = req.body;
    const verifiedPayload = z
      .object({
        name: z.string().min(1).nonempty(),
        price: z.number().min(1).positive(),
      })
      .parse(reqBody);

    const { name, price } = verifiedPayload;

    const isExist = await prisma.item.findFirst({
      where: {
        name: name.toLocaleLowerCase(),
      },
    });

    if (isExist)
      return res
        .json({ message: "Item already existed.", data: null })
        .status(409);

    const item = await prisma.item.create({
      data: {
        name: name.toLocaleLowerCase(),
        price: price,
        createdAt: new Date(),
      },
    });

    return res.json({ message: "Item created", data: item }).status(201);
  } catch (error) {
    if (error instanceof ZodError)
      return res
        .json({
          message: "Bad request",
          data: null,
        })
        .status(400);
    if (error instanceof Error)
      return res
        .json({ message: "Internal Server Error", data: null })
        .status(500);
  }
};

const getItemById = async (req, res) => {
    
    try {
      const pathVariable = req.params.id;
      const verifiedId = z.string().nonempty().parse(pathVariable);
    
      const isExist = await prisma.item.findFirst({ where: { id: verifiedId } });
    
      if (!isExist)
        return res.json({ message: "Item not found.", data: null }).status(404);
    
      return res.json({ message: "Item found.", data: isExist }).status(200);
    
  } catch (error) {
    if(error instanceof ZodError) return res.json({}).status(400)
    if(error instanceof Error) return res.json({}).status(500)
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    return res
      .json({
        message: "All items",
        data: items,
      })
      .status(200);
  } catch (error) {
    return res
      .json({ message: "Internal Server Error", data: null })
      .status(500);
  }
};

const deleteItemById = async (req, res) => {
  try {
    const pathVariable = req.params.id;
    const verifiedId = z.string().nonempty().parse(pathVariable);

    const isExist = await prisma.item.findFirst({ where: { id: verifiedId } });

    if (!isExist) return res.json({ message: "Item not found" }).status(404);

    await prisma.item.delete({ where: { id: verifiedId } });

    return res.json({ message: "Item deleted." }).status(200);
  } catch (error) {
    if (error instanceof ZodError)
      return res.json({ message: "Bad request", data: null }).status(400);
    if (error instanceof Error)
      return res
        .json({ message: "Internal Server Error", data: null })
        .status(500);
  }
};

const controllers = {
  createItem,
  getItemById,
  getAllItems,
  deleteItemById,
};

export default controllers;
