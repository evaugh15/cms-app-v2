const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');
const Asset = require('../models/assets');
const User = require('../models/users');



function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next();

}

// router.post('/assets', (req, res) =>{
//     let assetsData = req.body;
//     let assets = new Asset(assetsData);
//     if(error){
//         res.status(401).send('Error');
//     } else {
//         assets.save(registeredAssets);
//     }
// })
router.post('/assets', (req,res) =>{ //adding the user to the database and checking for errors in password confirmation
    let assetData = req.body;
    let asset = new Asset(assetData);
    
    asset.save((error, registeredAsset) => {
        if(error) {
            console.log(error)
        } else {
            res.status(200).send(registeredAsset)
        }
    })

    
});
router.post('/users', (req,res) =>{ //adding the user to the database and checking for errors in password confirmation
    let userData = req.body;
    let user = new User(userData);
    
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })

    
});

router.post('/signup', (req,res) =>{ //adding the user to the database and checking for errors in password confirmation
    let empData = req.body;
    let employee = new Employee(empData);
    
    if(employee.password != employee.passwordConf){
        res.status(401).send('Password do not match');
    } else {
        employee.save((error, registeredEmployee) =>{
            if (error){
                console.log(error)
            } else {
                let payload = { subject: registeredEmployee._id}
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token}) ;
            }
        });
    }

    
});

router.post('/login', (req,res) =>{ // login user and checking for valid entries in email and/or passoword
    let empData = req.body;
    Employee.findOne({email: empData.email}, (error, employee) =>{
        if(error){
            console.log(error);
        } else {
            if(!employee) {
                res.status(401).send('Invalid Email address')
            } else {
                if (employee.password != empData.password){
                    res.status(401).send('Invalid password');
                } else {
                    let payload = { subject: employee._id}
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({token}) ;
                }
            }
        }
    });
});


router.get('/', (req,res)=>{ // this is executed when the GET request for api route is requested
    res.send('From API route');
});

router.get('/home', (req,res) =>{
    res.send('HOMEPAGE');
});

router.get('/listassets', verifyToken, (req,res) =>{
    res.send('Asset Management Page');
});

router.get('/list-users', verifyToken, (req,res) =>{
    res.send('User List page');
});

module.exports = router;