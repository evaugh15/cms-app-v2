const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const assetSchema = new mongoose.Schema({

    itemName:  { type: String, required: true},
    itemModel:  { type: String, required: true},
    itemDes: {type: String }, 
    itemSerial: { type: String }, 
    itemCost: { type: String }, 
    itemQty: { type: String },
    //Uses http.post() to post data 
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
//note capital S in the collection name
module.exports = mongoose.model('Item', assetSchema, 'assets');