const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body , validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'Harryisagoodboy';


// Route 1:create a user useing  : POST :"/api/auth/CreateUser" . dosent require Auth . no login required
router.post('/createuser',[
    body('name', "Enter a Valid Name").isLength({min:3}),
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Passwords minimum length should be 5").isLength({min:5})] ,
    async (req, res)=>{
        let success = false;
        // if error then send bad request ans show error
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success ,errors:errors.array()});
        }
        // check whether the user with same email already exists or not .

        try{

        
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({success ,error : "Sorry a user with this E-mail already exists"})
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user= await User.create({
            name: req.body.name,
            email:req.body.email,
            password:secPass
        });
        const data={
            user :{
                id : user.id 
            }
        }
        const authToken = jwt.sign(data , JWT_SECRET);
        success=true;
        res.json({success , authToken})
        // console.log(authToken);
        
        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        //     res.json({error:"please enter a unique value for email", message : err.message})})
        // res.json(user)
        }catch(error){
            let success = false;
            console.error(error.message);    
            res.status(500).send( success ,"INTERNAL SERVER ERROR");
        }
})

// Route 2: Authenticate a user useing  : POST :"/api/auth/login" . no login required
router.post('/login',[
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password can not be blank").exists()
],
async (req, res)=>{
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            success = false;
            return res.status(400).json({ success , errors:errors.array()});
        }
        const {email , password}=req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                success = false;
                return res.status(400).json({ success , error:"Try to login through correct Credential"})
            }
            const passwordCompare = await bcrypt.compare(password , user.password);
            if(!passwordCompare){
                return res.status(400).json({success,error:"Try to login through correct Credential"})
            }
            const data={
                user :{
                    id : user.id 
                }
            }
            success =true;
            const authToken = jwt.sign(data , JWT_SECRET);
            res.json({ success ,authToken})

        } catch (error) {
            success = false;
            console.error(error.message);    
            res.status(500).send(success , "INTERNAL SERVER ERROR");
        }
    })


// Route 3:Get Logged on user Details using :  : POST :"/api/auth/getuser" . login required
router.post('/getuser', fetchuser , async (req, res)=>{
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);    
        res.status(500).send("INTERNAL SERVER ERROR");
    }
})
module.exports = router;