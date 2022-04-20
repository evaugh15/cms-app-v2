const mongoose = require("mongoose")

const Schema = mongoose.Schema
const assetSchema = new Schema({
    itemName: String,
    itemModel: String,
    itemDes: String,
    itemSerial: String,
    itemCost: String,
    itemQty: String
})

module.exports = mongoose.model('asset', assetSchema, 'assets');