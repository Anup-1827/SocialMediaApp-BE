const User = require('../models/Users');
const bcrypt = require('bcrypt');

exports.UpdateUser = async (req, res)=>{
    try{
        const user = req.body;
        const id = req.params.id;

        // if(user.userId === id || user.isAdmin){
            if(user.password){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }

            try{
                const userInfo = await User.findByIdAndUpdate(id, {$set: user});
                // res.status(200).json("Account is updated  successfully");
                res.status(200).json({"isSuccess": true, "Message": "Account Updated Successfully"});
            }
            catch(err){
                res.status(403).json(`Unable to update Account :- ${err}`);
            }
        // }
        // else{
        //     res.status(403).json("You are not admin you can only change your account!!!!")
        // }
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.DeleteUser = async(req, res)=>{
    try{
        const user = req.body;
        const id = req.params.id;

        if(user.userId === id || user.isAdmin){

            try{
                const userInfo = await User.deleteOne({_id:id});
                res.status(200).json("User Deleted successfully");
            }
            catch(err){
                res.status(403).json(`Unable to delete Account :- ${err}`);
            }

        }
        else{
            res.status(403).json("You are not admin you can only delete your account!!!!")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.GetUser = async(req,res)=>{
    try{
        const userName = req.query.userName;
        const userId = req.query.userId;
        const user = userId? await User.findById(userId): await User.findOne({userName});
        const {password, email, ...other} = user._doc;
        res.status(200).json(other) 
    }
    catch(err){
        res.status(500).json(`Could not find User ${err}`)
    }
}


exports.FollowUser = async(req, res)=>{

    if(req.params.id !== req.body.id){
        try{
            const currentId = req.params.id;
            const userId = req.body.id;

            const currentUser = await User.findById(currentId);
            const user = await User.findById(userId);
    
            if(!user.followers.includes(currentId)){
                
                await currentUser.updateOne({$push: {following: userId}})
               await  user.updateOne({$push: { followers: currentId}})
                res.status(200).json("Following Now");  
            }
            else{
                res.status(403).json("You are already Following");
            }

        }
        catch(err){
            res.status(403).json(`Eroor in Following ${err}`);
        }
    }
    else{
        res.status(403).json("You Can not Follow Yourself");
    }

   
}

exports.UnFollowUser = async(req, res)=>{

    if(req.params.id !== req.body.id){
        try{
            const currentId = req.params.id;
            const userId = req.body.id;

            const currentUser = await User.findById(currentId);
            const user = await User.findById(userId);
    
            if(currentUser.following.includes(userId)){
                
                await currentUser.updateOne({$pull: {following: userId}})
               await  user.updateOne({$pull: {followers: currentId}})
                res.status(200).json("UnFollowing Now");  
            }
            else{
                res.status(403).json("You are not Following");
            }

        }
        catch(err){
            res.status(403).json(`Eroor in UnFollowing ${err}`);
        }
    }
    else{
        res.status(403).json("You can not UnFollow Yourself");
    }

   
}

