const mongoose = require("mongoose")

const Schema = mongoose.Schema
const employeeSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    passwordConf: String
})

module.exports = mongoose.model('employee', employeeSchema, 'employees');