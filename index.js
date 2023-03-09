require("dotenv").config();

const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/index");
app.use(cors());

// static express for static image folder
app.use(express.static("public"));
// menerima application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));
// menerima json
app.use(json());
// CORS (Cross-origin resource sharing)
// menambahkan route (prefix, nama router)
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
