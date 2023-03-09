const { query } = require('express');
const db = require('../../helper/connection')
const { v4: uuidv4 } = require('uuid');

const usersModel = {
    // CREATE
    create: ({username, phone_number, email, password, pin, img, saldo }) => {
        console.log(username,phone_number,email,password,pin,img,saldo)
        console.log(uuidv4())
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users (user_id, phone_number, email,  saldo, img, pin, username ) VALUES ($1, $2,$3,$4,$5,$6,$7)`,
                [uuidv4(), phone_number, email,saldo,img,pin,username],
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve({ phone_number, email,saldo,img,pin,username})
                    }
                }
            )
        })
    },

    query: (search, employment_type, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY username ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !employment_type) {
            return orderQuery
        } else if (search && employment_type) {
            return `WHERE username ILIKE '%${search}%' AND email ILIKE '${employment_type}%' ${orderQuery}`
        } else if (search || employment_type) {
            return `WHERE username ILIKE '%${search}%' OR email ILIKE '${employment_type}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, employment_type, sortBy = 'ASC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from users ${this.query(search, employment_type, sortBy, limit, offset)}`,
                (err, result) => {
                    // console.log(result);
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows)
                    }
                }
            )
        })
    },

    readDetail: (user_id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from users WHERE user_id='${user_id}'`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows[0])
                    }
                }
            );
        })
    },

    // SINGLE
    update: function(req, id) {
        return new Promise((success, failed) => {
            const {username, phone_number, email, password, pin, img, saldo  } = req.body
            db.query(`SELECT * FROM users WHERE user_id='${id}'`, (error, result) => {
                if (error) {
                    return failed(error.message)
                } else {
                    // console.log(result);
                    if (result.rows.length < 1) {
                        return failed('Id not found!')
                    } else {
                        db.query(`UPDATE users SET username='${username || result.rows[0].username}', img='${(req.file != undefined) ? req.file.filename : result.rows[0].img}', email='${email || result.rows[0].email}', password='${password || result.rows[0].password}', phone_number='${phone_number || result.rows[0].phone_number}', pin='${pin || result.rows[0].pin}', saldo='${saldo || result.rows[0].saldo}'  WHERE user_id='${id}'`, (error) => {
                            if (error) {
                                return failed(error.message)
                            } else {
                                return success(result.rows)
                            }
                        })
                    }
                }
            })
        })
    },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (user_id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from users WHERE user_id='${user_id}' RETURNING img`,
                (err, result) => {
                    console.log(result);
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows)
                    }
                }
            )
        })
    }
}

module.exports = usersModel