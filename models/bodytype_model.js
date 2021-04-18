const mongoose = require('mongoose');

const Bodytype = mongoose.model('Bodytype', {
    bname : {
        type : String
    },
    bimage : {
        type : String
    },
    lunges : {
        type : Number
    },
    pushups :
    {
        type : Number
    },
    squats :
    {
        type : Number
    },
    planks :
    {
        type : Number
    },
    side_plank  :
    {
        type :  Number
    },
    dumbell :{
        type : Number
    },

})


module.exports = Bodytype;