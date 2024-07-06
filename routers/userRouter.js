const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")

//Register User

router.post("/",async(req, res)=>{
    try{
        const {email, pass, passVerify} = req.body;

        if(!email || !pass || !passVerify)
            return res.status(400).json({errorMessage: "Enter all fields"});

        if(pass != passVerify)
            return res.status(400).json({errorMessage: "Passwords dont match"});

        const existingUser = await User.findOne({email});

        if(existingUser)
            return res.status(400).json({errorMessage: "Account already exists"});
        
        //hash password

        const salt = await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(pass,salt);

        //save new user to db

        const newUser= new User({
            email,passwordHash
        });      

        const savedUser= await newUser.save();

        //sign the token

        const token= jwt.sign(
            {
            user: savedUser._id,
            },
            process.env.JWT_SECRET
        );

        //send the token in a cookie
        
        res
            .cookie("token", token, {
                httpOnly: true,
        })
        .send();
    
    }catch(err){
        console.error(err);
        res.status(500).send()
    }
});

//log in user

router.post("/login", async(req,res) => {

    try{
        const {email, pass} = req.body;

        //validate
        if(!email || !pass)
            return res.status(400).json({errorMessage: "Enter all fields"});

        const existingUser=await User.findOne({email});

        if(!existingUser)
            return res.status(400).json({errorMessage: "Wrong email or password."});

        const passwordCorrect= await bcrypt.compare(pass, existingUser.passwordHash);

        if (!passwordCorrect)
            return res.status(400).json({errorMessage: "Wrong email or password."});

        const token= jwt.sign(
            {
            user: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        //send the token in a cookie
        
        res
            .cookie("token", token, {
                httpOnly: true,
        })
        .send();


        router.get("/logout",(req,res)=>{
            res
                .cookie("token","",{
                    httpOnly: true,
                    expires: new Date(0),
                })
                .send()
        });

        
    } catch(err){
        console.error(err);
        req.status(500).send();
    }
});

module.exports = router;