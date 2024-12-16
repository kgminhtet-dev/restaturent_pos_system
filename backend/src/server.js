import app from "./app.js";

const port = 3001;

app.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}`);
});
