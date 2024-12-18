import express from "express";
import controller from "./controller.js";

const itemRoutes = express.Router();
itemRoutes.get("/api/v1/items", controller.getItems);
itemRoutes.post("/api/v1/items", controller.createItem);

export default itemRoutes;
