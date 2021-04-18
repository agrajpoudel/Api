const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    pname : {
        type : String
    },
    pdesc : {
        type : String
    },
    pprice : {
        type : String
    },
    pimage : {
        type : String
    },
})


module.exports = Product;