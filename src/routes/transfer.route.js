const express = require("express");
const router = express();

const transferController = require("../controllers/transfer.controller.js");




router.post("/transfer", transferController.create);
router.get("/transfer/:id", transferController.getById);
// router.post("/regis-user", authController.registeruser);


module.exports = router;
