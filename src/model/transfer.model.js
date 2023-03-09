const { query } = require("express");
const db = require("../../helper/connection");
const { v4: uuidv4 } = require("uuid");
const time = new Date()

const transferModel = {
    getById:(sender_id) =>{
      console.log(sender_id);
      return new Promise((resolve, reject) => {
          db.query(
              `SELECT * from transfers WHERE sender_id='${sender_id}'`,
              (err, result) => {
                  if (err) {
                      return reject(err.message)
                  } else {
                      return resolve(result.rows)
                  }
              }
          )
      })
  },
  updateBalance: ({sender_id,reciever_id, amount, created_at, reciever_name, reciever_phone}) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE users SET saldo = saldo - $1 WHERE user_id = $2`,
            [amount, sender_id],
            (err) => {
                if (err) {
                    return reject(err.message)
                } else {
                   db.query(
                    `UPDATE users SET saldo = saldo + $1 WHERE user_id = $2`,
                    [amount, reciever_id],
                    (err)=>{
                      if (err) {
                        return reject(err.message)
                      } else {
                        db.query(
                          `INSERT INTO transfers (transfer_id, sender_id, reciever_id, amount,created_at,reciever_name, reciever_phone) VALUES ($1, $2, $3, $4,$5,$6,$7)`,
                          [uuidv4(), sender_id, reciever_id, amount, time,reciever_name, reciever_phone],
                          (err, result)=>{
                            if (err) {
                              return reject(err.message)
                            } else {
                              return resolve({message: "Transaction Success"})
                            }
                          }
                        )
                      }
                    }
                   )
                }
            }
        )
    })
  },

};

module.exports = transferModel;
