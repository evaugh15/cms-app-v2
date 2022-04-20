const mongoose = require("mongoose")

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: String,
    userDept: String,
    userEmail: String,
    userName: String,
    userPhone: String,
    userTitle: String
})

module.exports = mongoose.model('user', userSchema, 'users');













//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
//note capital S in the collection name

