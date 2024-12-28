import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.post("/:number", controller.createTable);

router.get("/", controller.getAllTables);

router.delete("/:id", controller.deleteTableById);

router.put("/:id", controller.updateTable)

export default router;
