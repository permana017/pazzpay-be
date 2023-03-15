const usersModel = require("../model/users.model.js")
const { Pagination } = require("../../helper")
const { unlink } = require('node:fs')

const usersController = {
    create: (req, res) => {
        // console.log(req.file);
        const request = {
            ...req.body,
            img: req.file.filename,
        }
        return usersModel.create(request)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },
    read: (req, res) => {
        let { search, employment_type, sortBy, page, limit } = req.query
        let offset = Pagination.buildOffset(page, limit)
        return usersModel.read(search, employment_type, sortBy, limit, offset)
            .then((result) => {
                return res.status(200).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    readDetail: (req, res) => {
        return usersModel.readDetail(req.params.id)
            .then((result) => {
                if (result != null) {
                    return res.status(200).send({ message: "Success", data: result })
                } else {
                    return res.status(404).send({ message: "Sorry data not found! Please check your input ID!" })
                }
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    // SINGLE
    update: (req, res) => {
        // Id product
        const id = req.params.id

        
        return usersModel.update(req, id)
        .then((result) => {
            // console.log("image send",req?.file?.filename);            
            if (result[0].img !== "null" || result[0].img !== null ||  result[0].img !== ""){
                if (typeof req?.file != "undefined") {
                    unlink(`public/uploads/images/${result[0].img}`, (err) => {
                        if(err) console.log('file tidak ada ' , err.message);
                    });
                    return res.status(200).send({ message: `Successfully update data id=${id}`})
                
                }else{
                    return res.status(200).send({ message: `Successfully update data id=${id}`})
                }
            }else{
                return res.status(200).send({ message: `Successfully update data id=${id}`})
            }
        })
        // Error handling
        .catch(error => {
            return res.status(400).send({
                Status: 400,
                Message: `${error}`
            })
        })
    },

    remove: (req, res) => {
        return usersModel.remove(req.params.id)
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    unlink(`public/uploads/images/${result[i].img}`, (err) => {
                        if (err) throw err;
                    });
                }
                return res.status(200).send({ message: "Success", data: `users ${req.params.id} has been deleted` })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    }
}

module.exports = usersController