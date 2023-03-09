const { query } = require("express");
const db = require("../../helper/connection");

const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");

const authModel = {
  loginuser: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      db.query("select * from users where email=$1", [email], (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          if (result.rows.length == 0) {
            return reject("email or password wrong");
          } else {
            bcrypt.compare(
              password,
              result.rows[0].password,
              function (err, hashingResult) {
                if (err) {
                  return reject("email or password wrong");
                } else if (!hashingResult) {
                  return reject("email or password wrong");
                } else {
                  return resolve(result.rows[0]);
                }
              }
            )
          }
        }
      })
    })
  },

  registeruser: ({ username, email, phone_number, password }) => {
    console.log("id", uuidv4(), username, email, phone_number, password)
    return new Promise((resolve, reject) => {
      db.query(
        `insert into users (user_id, username, email, password, phone_number) values ($1,$2,$3,$4,$5)`,
        [uuidv4(), username, email, password, phone_number],
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve("Register success");
          }
        } 
      );
    });
  },
};

module.exports = authModel;
