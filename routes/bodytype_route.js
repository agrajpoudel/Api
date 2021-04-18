const express =  require('express');
const router = express.Router();
const Bodytype = require('../models/bodytype_model');
const auth = require('../middleware/auth')
const upload = require('../middleware/Upload')
const {check, validationResult, header} =require('express-validator');

// register
router.post('/bodytype/add',upload.single('bimage'),function(req, res){
    console.log(req.body);
    const errors = validationResult(req);
    if(errors.isEmpty()){
    // valid
    // const path = req.file.path;
    const bname = req.body.bname;
    const lunges =req.body.lunges;
    const pushups = req.body.pushups;
    const squats = req.body.squats;
    const planks = req.body.planks;
    const side_plank = req.body.side_plank;
    const dumbell = req.body.dumbell;
        const data = new Bodytype({
            bname:bname,
            lunges:lunges,
            pushups:pushups,
            squats:squats,
            planks:planks,
            side_plank:side_plank,
            dumbell:dumbell,
            bimage:"/Images"+req.file.filename
        })
        data.save()
        .then(function(result){
            res.status(201).json({success:true,data:data})
           
        })
        .catch(function(err){
            res.status(500).json({error : err})
        })
    }
      else{
        // invalid
        res.status(400).json(errors.array());
        
    }
    
     
})


// to show value
router.get('/bodytype/show', function(req, res){
 
    Bodytype.find().then(function(data1){
        res.json({success:true,data:data1,});
    })
})

// to delete
router.delete('/bodytype_delete/:id', auth.verifyUser, function (req, res) {
    //delete code
    const id = req.params.id;
    Bodytype.deleteOne({ _id: id }).then(function () {
        res.send("Deleted !")
    })

})


// for update
// router.put('/bodytype_update/:id', function (req, res) {
//     const id = req.params.id;
//     const fname = req.body.fname;
//     const lname = req.body.lname;
//     const username = req.body.username;
//     const email = req.bosy.email;
//     const password = req.body.password;
//     User.updateOne({ _id: id }, { fname: fname },{lname: lname},{username: username},{email:email},{password: password}).then(function () {
//         res.send("Updated!")
//     })
// })
module.exports = router;