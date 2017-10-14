var express = require("express")
const {accounts,users} = require('../db')
var router = express.Router()


router.post('/login', (req,res)=>{

    
var {username,password}=req.body
  users.findOne({username}).then(user=>{
     if(!user){
         return res.status(400).json({message:"User not found"})
     }
     if(user.password!=password){
        return res.status(400).json({message:"Incorrect password  for user"})
     }
     return res.json({
         success:true
     })
  })
});

module.exports = router;