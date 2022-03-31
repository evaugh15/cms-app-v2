const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const Item = require('./models/assets');
// const Assets = require('./models/assets');
//connect and display the status 

//const url = 'mongodb://127.0.0.1:27017/devices'
//mongoose.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true })    
//    .then(() => { console.log("database connected: ", url); })
//    .catch(() => { console.log("error connecting"); });

//const baseAPI = '/api/v1/';

const uri = "mongodb+srv://evaugh15:pgrOb7CQ7tRGtUrr@cluster0.ajypq.mongodb.net/devices";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("devices").collection("assets");
  // perform actions on the collection object
  client.close();
});

//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())
//app.use(cors())

//in the app.get() method below we add a path for the assets API 
//by adding /devices, we tell the server that this method will be called every time http://localhost:8000/devices is requested. 
app.get('/devices', (req, res, next) => {
    //we will add an array named appointment to pretend that we received this data from the database
    //call mongoose method find (MongoDB db.Assets.find())
    Item.find() 
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });

    //find a asset based on the id
app.get('/devices/:_id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.Assets.findOne())
    Item.findOne({_id: req.params.id}) 
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
});

//serve incoming put requests to /students 
app.put('/devices/:id', (req, res, next) => { 
    console.log("id: " + req.params.id) 
    // check that the parameter id is valid 
    if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
        //find a document and set  new asset names, model, etc. 
        Item.findOneAndUpdate( 
            {_id: req.params.id}, 
            {$set:{ 
                itemName : req.body.itemName, 
                itemModel : req.body.itemModel,
                itemDes: req.body.itemDes,
                itemSerial: req.body.itemSerial,
                itemCost: req.body.itemCost,
                itemQty: req.body.itemQty
            }}, 
            {new:true} 
        ) 
        .then((item)=> { 
            if (item) { //what was updated 
                console.log(item); 
            } else { 
                console.log("no data exist for this id"); 
            } 
        }) 
        .catch((err) => { 
            console.log(err); 
            res.status('400').send('ERROR')
        }); 
    } else { 
        console.log("please provide correct id"); 
    } 

});

});

//serve incoming post requests to /assets
app.post('/devices', (req, res, next) => {
    // create a new student variable and save request’s fields 
    const item = new Item({
        itemName: req.body.itemName,
        itemModel: req.body.itemModel,
        itemDes: req.body.itemDes,
        itemSerial: req.body.itemSerial,
        itemCost: req.body.itemCost,
        itemQty: req.body.itemQty,
    });

        //send the document to the database 
        item.save()
        //in case of success
       .then(() => { console.log('Success');})
       //if error
       .catch(err => {console.log('Error:' + err);});
});

     //:id is a dynamic parameter that will be extracted from the URL
    app.delete("/devices/:id", (req, res, next) => {
        Item.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json("Asset Deleted!");
        });
    });
    


   //to use this middleware in other parts of the application
    
    module.exports=app;

/*
//in the app.get() method below we add a path for the patients API 
//by adding /patients, we tell the server that this method will be called every time http://localhost:8080/assets is requested. 
app.get('/assets', (req, res, next) => {
    //we will add an array named students to pretend that we received this data from the database
    //call mongoose method find (MongoDB db.item.find())
    item.find()
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });
});
//find a asset based on the id
app.get('/assets/:_id', (req, res, next) => {
    //call mongoose method findOne (MongoDB db.item.findOne())
    item.findOne({_id: req.params.id})
        //if data is returned, send data as a response 
        .then(data => {
            res.status(200).json(data)
            console.log(data);
        })
        //if error, send internal server error
        .catch(err => {
            console.log('Error: ${err}');
            res.status(500).json(err);
        });
});
//serve incoming put requests to /assets
app.put('/assets/:id', (req, res, next) => {
    console.log("id: " + req.params.id)
    // create a new patient variable and save request’s fields 
    const asset = new Asset({
        Name: req.body.Name,
        Model: req.body.Model,
        Desc: req.body.Desc,
        Serial: req.body.Serial,
        Cost: req.body.Cost,
        Qty: req.body.Qty
    });
    //send the document to the database 
    item.save()
        //in case of success
        .then(() => { console.log('Success'); })
        //if error
        .catch(err => { console.log('Error:' + err); });
    //:id is a dynamic parameter that will be extracted from the URL
    app.delete("/assets/:id", (req, res, next) => {
        item.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json("Deleted!");
        });
    });
});
*/