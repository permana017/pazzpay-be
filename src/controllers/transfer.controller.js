const transferModel = require("../model/transfer.model.js");
const usersModel = require("../model/users.model.js");


const transferController = {
    getById: (req, res) => {
        console.log(req.params.id);
        return transferModel.getById(req.params.id)
            .then((result) => {
                return res.status(200).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },


  create: async (req, res) => {
    const request = {
        ...req.body
    }
    try {
        const resultUserById = await usersModel.readDetail(request.sender_id)
        console.log(resultUserById)
        if(resultUserById.saldo < request.amount) {
            return res.status(500).send({
                message: 'saldo tidak cukup'
            })
        }
        const result = await transferModel.updateBalance(request)
        return res.status(201).send({data: result })

    } catch (error) {
        return res.status(500).send(error)
    }
    // return transferModel.create(request)
    //     .then((result) => {
    //         return res.status(201).send({data: result })
    //     }).catch((error) => {
    //         return res.status(500).send(error)
    //     })
  },

};

module.exports = transferController;
