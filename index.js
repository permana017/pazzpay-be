require("dotenv").config();

const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/index");
app.use(cors());
app.use(json());
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use("/api/", router);

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "NOT FOUND!",
  });
});

const port = 5001;
app.listen(port, (req, res) => {
  console.log(`Server successfully running on port ${port}`);
});
