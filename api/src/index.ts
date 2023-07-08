import express from "express";

const routes = require("./routes");
const app = express();
const PORT: Number = 3020;

require("dotenv").config();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log("The application is listening");
});
