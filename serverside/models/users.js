const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const userSchema = new mongoose.Schema({

    Name:  { type: String, required: true},
    userTitle:  { type: String, required: true},
    userEmail: {type: String, required: true }, 
    userPhone: { type: String }, 
    userName: { type: String }, 
    userDept: { type: String },
    //Uses http.post() to post data 
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
//note capital S in the collection name
module.exports = mongoose.model('Item', userSchema, 'users');