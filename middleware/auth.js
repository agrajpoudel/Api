const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const Product = require('../models/product_model');


//auth 1
module.exports.verifyUser  = function(req, res, next){
    try{
    const token = req.headers.authorization.split(" ")[1];
    const data1 = jwt.verify(token, 'anysecretkey');
    // in this data id is availabel..
    User.findOne({_id : data1.userId})
    .then(function(userData){
        req.user1 = userData;
        next();
    })
    .catch(function(ee){
        res.status(401).json({error : ee});
    })
    }

    catch(e){
        res.status(401).json({error : e})
    }
  
}