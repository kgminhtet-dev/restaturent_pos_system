import express from "express";

const itemRoutes = express.Router();
itemRoutes.get("/api/v1/items", (req, res) => {
  res.send("Item lists");
});

export default itemRoutes;
