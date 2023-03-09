const express = require("express");
const router = express();

const authRoute = require("./auth.route");
const usersRoute = require('./users.route');
const transferRoute = require('./transfer.route');

router.get('/', (req, res) => {
    return res.send('Backend for Hiring Job App - ARRAY')
})

router.use("/transaction", transferRoute);
router.use("/auth", authRoute);
router.use('/users', usersRoute);
module.exports = router;
