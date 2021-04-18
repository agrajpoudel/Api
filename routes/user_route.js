//express, user
const express =  require('express');
const router = express.Router();
const User = require('../models/user_model');
const {check, validationResult} =require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const upload = require('../Middleware/Upload')

// register
router.post('/user/register',function(req, res){
    console.log(req.body);
    const errors = validationResult(req);
    if(errors.isEmpty()){
    // valid
    // const path = req.file.path;
    const fname = req.body.fname;
    const lname =req.body.lname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcryptjs.hash(password, 10 , function(err, hash1){
        const data = new User({fname : fname, lname : lname, username : username , email: email, password : hash1});
        const token =  jwt.sign({username : username }, 'anysecretkey');
        data.save()
        .then(function(result){
            res.status(201).json({message : "Registered Success!!", token : token})
           
        })
        .catch(function(err){
            res.status(500).json({error : err})
        })
      })
    }
      else{
        // invalid
        res.status(400).json(errors.array());
        
    }
    
     
})



 // login system ............
 router.post('/user/login', function(req,res){
    const username = req.body.username;
    const password = req.body.password; 
    User.findOne({username : username})
    .then(function(userData1){
        if(userData1===null){
            // username false
           return res.status(401).json({message : "Invalid credentials!!"})
        }
        // if username exists
        bcryptjs.compare(password , userData1.password, function(err, result){
            if(result===false){
                // password wrong
                return res.status(401).json({message : "Invalid credentials!!"})
            }
            // all good
            // then generate token - ticket
           const token =  jwt.sign({userId : userData1._id }, 'anysecretkey');
         //  res.send(token)
           return res.status(200).json({
               message : "Auth succcess!",
               token : token
           })

            
        })

    })
    .catch(function(e){
        res.status(500).json({message : e})
    })

})


// to show value
router.get('/user/show', function(req, res){
 
    User.find().then(function(data1){
        res.send(data1);
    })
})

// to delete
router.delete('/user_delete/:id', auth.verifyUser, function (req, res) {
    //delete code
    const id = req.params.id;
    User.deleteOne({ _id: id }).then(function () {
        res.send("Deleted !")
    })

})


// for update
router.put('/user_update/:id', function (req, res) {
    const id = req.params.id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const email = req.bosy.email;
    const password = req.body.password;
    User.updateOne({ _id: id }, { fname: fname },{lname: lname},{username: username},{email:email},{password: password}).then(function () {
        res.send("Updated!")
    })
})
module.exports = router;