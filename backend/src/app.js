import express from "express";
import itemRoutes from "./features/items/route.js";
import categoryRoutes from "./features/category/route.js";
import tableRoutes from "./features/tables/route.js";

const app = express();

// npx prisma init
// npx prisma migrate dev --name init

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/tables", tableRoutes);

app.use(itemRoutes);

export default app;
