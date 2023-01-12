
const User = require("../models/userModel")
exports.addUser = (req, res) => {
    const user = User.addUser(req.body)
    res.status(201).json({
        status: "success",
        data: user
    })
}

exports.getUsers = (req, res) => {
    const users = User.getUsers()

    res.status(200).json({
        status: "success",
        data: {
            users
        }
    })
}