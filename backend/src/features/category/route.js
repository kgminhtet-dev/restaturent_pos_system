import { Router } from "express";
import controller from "./controller.js";

const router = Router();

router.get("/", (req, res) => controller.getAllCategories(req, res));

router.get("/:id", (req, res) => controller.getCategoryById(req, res));

router.put("/:id", (req, res) => controller.deleteCategory(req, res));

export default router;
