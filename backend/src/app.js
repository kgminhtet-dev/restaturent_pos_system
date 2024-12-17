import express from "express";
import itemRoutes from "./features/items/route.js";

const app = express();

// npx prisma init
// npx prisma migrate dev --name init

app.use(itemRoutes);
app.use("/", (req, res) => {
  res.send("Hello, POS!!!");
});

export default app;
