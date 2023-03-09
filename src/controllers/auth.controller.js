const authModel = require("../model/auth.model.js");
const { formResponse } = require("../../helper/index");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { PRIVATE_KEY } = process.env;
const authController = {
  loginuser: (req, res) => {
    return authModel
      .loginuser(req.body) //req.query dari express js
      .then((result) => {
        let token = jwt.sign(
          { id: result.id_users },
          PRIVATE_KEY, //buat jadi env
          { expiresIn: "1d" },
          (err, token) => {
            return formResponse(
              200,
              "success",
              {
                token,
                user: {
                  user_id: result.user_id,
                  username: result.full_name,
                  image: result.img,
                  role: result.role,
                },
              },
              res
            );
          }
        );
      })
      .catch((error) => {
        //return formResponse(500, error, res);

        return res.status(500).send({ message: error });
      });
  },

  registeruser: (req, res) => {
    console.log("pw befor hash",req.body.password);
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      //default saltrune=15 atau 10,
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          username: req.body.username,
          email: req.body.email,
          password: hash,
          phone_number: req.body.phone_number,
        }
        console.log("data request",request.password);
        return authModel
          .registeruser(request)
          .then((result) => {
            return formResponse(201, "succes register user", result, res);
          })
          .catch((error) => {
            //return formResponse(500, error);
            if (error.code == "23505") {
              return res.status(500).send({ message: "email already exist" });
            }
            return res.status(500).send({ message: error });
          });
      }
    });
  },
  //
};

module.exports = authController;
