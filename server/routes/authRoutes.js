const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const router = express.Router();

const JWT_Secret = process.env.JWT_Secret
// Register
router.post("/register", async (req,res)=>{
    const {name, email,password,role} = req.body;
    try{
        const existing = await User.findOne({email});
        if (existing) return res.send(400).json({message: "User Already Exists"});
        const hash = await bcrypt.hash(password,10)
        const newUser = new User({name, email, password:hash, role})
        await newUser.save();

        const token = jwt.sign({id: newUser._id, role:newUser.role}, JWT_Secret);
        res.json({token, user: {id:newUser._id, name:newUser.name, role: newUser}})
    }
    catch(error){
        console.log(error, "server Error");
    }
})

router.post("/login", async (req,res)=>{
    const {email, password} = req.body;
    try{
       const user = await User.findOne({email});
       if(!user) return res.status(400).res.json({message: "User not exists"})
       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch) return res.status(400).json({message:"Wrong Password"});

       const token = jwt.sign({ id: user._id, role: user.role }, JWT_Secret);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;