const User = require('../models/Users') ;
const bcrypt = require('bcrypt');

exports.Register = async(req,res)=>{
    

    try{
        // Start:--Hasing Password
        console.log(req.body)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // End:--Hasing Password
        

        const newUser = new User({
            userName: req.body.userName,
            password: hashedPassword,
            email: req.body.email,
            profilePicture: req.body.profilPicture,
            coverPicture: req.body.coverPicture,
            followers: req.body.followers,
            following: req.body.following,
            isAdmin: req.body.isAdmin,
            city:req.body.city,
            from:req.body.from,
            relationship:req.body.relationship
        })

        const user = await newUser.save(); //Saving to DB
         res.status(200).json(user);
        // res.send("User is Registered");
    }
    catch(err){
        console.log(err)
        res.status(404).json(err);
    }
} 

exports.Login = async (req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        // Verfiying User
        if(!user) return res.status(400).json("User not Found");

        // Verifying Password
        const verifyPassword = await bcrypt.compare( req.body.password ,user.password);
        if(!verifyPassword) return res.status(400).json("Password is incorrect");

        // Success
       return res.status(200).json(user)

    }
    catch(err){
        res.status(500).json(err)
    }
}