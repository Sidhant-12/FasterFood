const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "ThisAuthorizationIsDoneBySidhant"

router.post("/createuser", 
body('email','Invalid email-id').isEmail(),
body('password','minimum length must be of 8 characters').isLength({ min: 8 }),
body('name','minimum length must be of 3 characters').isLength({ min: 3 }),
async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt)

    try{
        await User.create({
            name:req.body.name,   
            password:secPassword,
            email:req.body.email,
            location:req.body.location


        })
        res.json({success:true});

    }catch(error){
        console.log(error)
        res.json({success:false});
    }

})

router.post("/loginuser", 
body('email','Invalid email-id').isEmail(),
body('password','minimum length must be of 8 characters').isLength({ min: 8 }),

async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try{

        let userData = await User.findOne({email})
        if(!userData){
            return res.status(400).json({errors:"Enter correct user credentials!"});
        }

        const decryptPass = await bcrypt.compare(req.body.password,userData.password)
        
        if(!decryptPass){
            return res.status(400).json({errors:"Enter correct password!"});
        }
        
        const data = {
            user:{
                id:userData.id  // id of document of mongoDB
            }
        }
        
        const authToken = jwt.sign(data,jwtSecret); // Header,Payload,Signature
        return res.json({success:true, authToken });

    } catch(error){
        console.log(error)
        return res.json({success:false});
    }

})

module.exports = router;