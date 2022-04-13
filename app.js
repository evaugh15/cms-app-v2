const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Item = require('./serverside/models/assets');
const People = require('./serverside/models/users');
const configFile = require('./serverside/config.json');
//const PORT = process.env.PORT || 8080;

// reference the db credentials from an external file. Never hard code credentials within source code.
// unencrypted properties file isn't too much better, but can be controlled and allows for credentials to be updated by admins without
// also requiring the app to be recompiled/redeployed/etc
// see also: CWE 798 "Use of Hard-coded Credentials" https://cwe.mitre.org/data/definitions/798.html
//mongodb+srv://evaugh15:abc1234@cluster0.ajypq.mongodb.net/devices?retryWrites=true&w=majority
/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://'localhost/devices',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
*/
mongoose.connect(process.env.MONGODB_URI || 'mongodb://' + configFile.dbuser + ':' + configFile.dbpass + '@cluster0-shard-00-00.ajypq.mongodb.net:27017,cluster0-shard-00-01.ajypq.mongodb.net:27017,cluster0-shard-00-02.ajypq.mongodb.net:27017/devices?ssl=true&replicaSet=atlas-ohwgae-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected Successfully");
});

app.use(express.static('./dist/cms'));
app.get('/*', function(req, res){
    res.sendFile('index.html', {root: 'dist/cms/'})
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
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

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
app.get('/devices/:id', (req, res, next) => {
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

//serve incoming put requests to /devices
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
    
app.get('/users', (req, res, next) => {
        //we will add an array named students to pretend that we received this data from the database
        People.find() 
        //if data is returned, send data as a response 
        .then(data => res.status(200).json(data))
        //if error, send internal server error
        .catch(err => {
        console.log('Error: ${err}');
        res.status(500).json(err);
    });
    
    //find a student based on the id
    app.get('/users/:id', (req, res, next) => {
        //call mongoose method findOne (MongoDB db.Students.findOne())
        People.findOne({_id: req.params.id}) 
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
        app.put('/users/:id', (req, res, next) => { 
            console.log("id: " + req.params.id) 
            // check that the parameter id is valid 
            if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
                //find a document and set new first and last names 
                People.findOneAndUpdate( 
                    {_id: req.params.id}, 
                    {$set:{ 
                        Name: req.body.Name, 
                        userDept: req.body.userDept,
                        userEmail: req.body.userEmail,
                        userName: req.body.userName,
                        userPhone: req.body.userPhone,
                        userTitle: req.body.userTitle
                    }}, 
                    {new:true} 
                ) 
                .then((people) => { 
                    if (people) { //what was updated 
                        console.log(people); 
                    } else { 
                        console.log("no data exist for this id"); 
                    } 
                }) 
                .catch((err) => { 
                    console.log(err); 
                }); 
            } else { 
                console.log("please provide correct id"); 
            } 
    });
    
    
    });
    
    //serve incoming post requests to /students
    app.post('/users', (req, res, next) => {
        
        // create a new doctor variable and save requestâs fields 
    const people = new People({
        Name: req.body.Name, 
        userDept: req.body.userDept,
        userEmail: req.body.userEmail,
        userName: req.body.userName,
        userPhone: req.body.userPhone,
        userTitle: req.body.userTitle
});
    
    //send the document to the database 
    people.save()
        //in case of success
        .then(() => { console.log('Success');})
        //if error
        .catch(err => {console.log('Error:' + err);});
                        
    });
        //:id is a dynamic parameter that will be extracted from the URL
    app.delete("/users/:id", (req, res, next) => {
        People.deleteOne({ _id: req.params.id }).then(result => {
            console.log(result);
            res.status(200).json("User Deleted!");
        });
    });

   //to use this middleware in other parts of the application
    
    module.exports=app;
