const express = require("express");
const router = express();

const validationUser = require("../middleware/validation-user");
//import controller
const authController = require("../controllers/auth.controller.js");

router.post("/login-user", authController.loginuser);
router.post("/regis-user", authController.registeruser);

//contoh menampilkan data
router.get("/", (req, res) => {return res.send(`hallo`)});

module.exports = router;
