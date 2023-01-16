const Conversation = require("../models/Conversation");
const User = require("../models/Users");

exports.SaveConverstion= async (req, res)=>{
    try{
        const conversationDetails = new Conversation({
            member: [req.body.senderId, req.body.receiverId]
        })
    
        const conversationResponse = await conversationDetails.save();
    
        res.status(200).json({isSuccess: true, message: null, response: conversationResponse});
    }
    catch(err){
        res.status(400).json({isSuccess: false,message:"Error in saving Converstaion", "error": err});
    }
    
}

exports.GetConversation = async (req, res)=>{
    try{
        const userId = req.params.userId;
        const conversationResponse = await Conversation.find({member : {$in: userId}});
        res.status(200).json({isSuccess: true, message: null, response: conversationResponse});
    }
    catch(err){
        res.status(400).json({isSuccess: false,message:"Error in Fethching Converstaion", "error": err});
    }
}