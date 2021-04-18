const express = require('express');
const router = express.Router();
const Product = require('../models/product_model');
const auth = require('../middleware/auth');
const upload = require('../middleware/Upload')

router.post('/product/add',upload.single('pimage'), function(req,res){
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const pprice = req.body.pprice;
    const pimage = req.body.pimage;
    
    const pdata = new Product({pname : pname, pdesc : pdesc, pprice : pprice, pimage:"/Images"+req.file.filename})
    pdata.save()
    .then(function(result){
        res.status(201).json({success:true,data:pdata})
    })
    .catch(function(eeeeee){
        res.status(500).json({ message : eeeeee})
    })

})
// to show value
router.get('/product/show', function(req, res){
 
    Product.find().then(function(data1){
        res.send({success:true,data:data1});
    })
})

// to delete
router.delete('/product_delete/:id', function (req, res) {
    //delete code
    const id = req.params.id;
    Product.deleteOne({ _id: id }).then(function () {
        res.send("Deleted !")
    })

})


// for update
router.put('/product_update/:id', function (req, res) {
    const id = req.params.id;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const pprice = req.body.pprice
    const pimage = req.body.pimage;
    Book.updateOne({ _id: id }, { pname: pname },{pdesc: pdesc},{pprice : pprice},{pimage: pimage}).then(function () {
        res.send("Updated!")
    })
})

module.exports = router;