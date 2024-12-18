import express from "express";
import controllers from "./controller.js";

const itemRoutes = express.Router();
itemRoutes.get("/api/v1/items", controllers.getAllItems);

itemRoutes.get("/api/v1/items/:id", controllers.getItemById);

itemRoutes.post("/api/v1/items", controllers.createItem);

itemRoutes.delete("/api/v1/items/:id", controllers.deleteItemById);

export default itemRoutes;
