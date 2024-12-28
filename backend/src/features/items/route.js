import express from "express";
import controllers from "./controller.js";

const itemRoutes = express.Router();

itemRoutes.get("/", controllers.getAllItems);
itemRoutes.get("/:id", controllers.getItemById);
itemRoutes.post("/", controllers.createItem);
itemRoutes.put("/:id", controllers.updateItem)
itemRoutes.delete("/:id", controllers.deleteItemById);

export default itemRoutes;
