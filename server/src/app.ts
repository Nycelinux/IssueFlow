import express from "express";
import cors from "cors";
import nodeHttp = require("node:http");
import response = require("express");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (request, response) => {
  response.send("Hello from express");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
