const mongoose = require('mongoose'); // third party -- 


const User = mongoose.model('User',{
    // pimage : {
    //     type: String
    // },
    fname : {
        type : String,
        required : true
    },
   lname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true       
    },

    password : {
        type : String,
        required : true
    }

})

module.exports = User;