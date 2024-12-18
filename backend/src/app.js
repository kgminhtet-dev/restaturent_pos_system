import express from "express";
import itemRoutes from "./features/items/route.js";

const app = express();

// npx prisma init
// npx prisma migrate dev --name init

app.use(express.json());

app.use("/api/v1/items", itemRoutes);

app.use("/", (req, res) => {
  res.send("Hello, POS!!!");
});

export default app;
