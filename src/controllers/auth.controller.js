const authModel = require("../model/auth.model.js");
const { formResponse } = require("../../helper/index");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { PRIVATE_KEY } = process.env;
const authController = {
    loginuser: (req, res) => {
        return authModel
            .loginuser(req.body)
            .then((result) => {
                let token = jwt.sign({
                    id: result.id_users
                }, PRIVATE_KEY, {
                    expiresIn: "1d"
                }, (err, token) => {
                    return formResponse(200, "success", {
                        token,
                        user: {
                            user_id: result.user_id,
                            username: result.full_name,
                            image: result.img,
                            role: result.role
                        }
                    }, res);
                });
            })
            .catch((error) => {
                //return formResponse(500, error, res);
                return res.status(400).send({ message: error });
            });
    },

    registeruser: (req, res) => {
        // console.log("pw befor hash",req.body.password);
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            //default saltrune=15 atau 10,
            if (err) {
                return res.status(400).send({ message: err.message });
            } else {
                const request = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    phone_number: req.body.phone_number
                }
                console.log("data request", request.password);
                if (request.username === "" || request.email === "" || request.phone_number === "") {
                    return res.status(400).send({ message: "please complete your data" });
                } else {
                    let pw = req.body.password
                    if (pw.length < 8) {
                        return res.status(400).send({ message: "Password Not Scured" });
                    } else {
                        return authModel.registeruser(request)
                            .then((result) => {
                                return formResponse(201, "succes register user", result, res);
                            })
                            .catch((error) => {
                                if (error.code == "23505") {
                                    return res.status(400).send({ message: "Email or Username Already Exist" });
                                }
                                return res.status(400).send({ message: error });
                            });
                    }
                }
            }
        });
    },
    //
};

module.exports = authController;
