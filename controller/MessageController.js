const Message = require("../models/Message");

// Start:-- Save Converstaion
exports.SaveMessage = async (req, res)=>{
    try{
        const message = new Message({
            conversationId : req.body.conversationId,
            senderId : req.body.senderId,
            text: req.body.text
        })
        
        const saveMessageRes = await message.save();
        res.status(200).json({isSuccess: true, message:null, response: saveMessageRes })
        
    }
    catch(err){
        res.status(500).json({isSuccess: false, message:"Error in saving messages", response: err })
    }
}

// End:-- Save Converstaion


// Start:--Get Conversation
exports.GetConversation = async (req, res)=>{
    try{
        const messageResponse = await Message.find({conversationId: req.params.conversationId})
        res.status(200).json({isSuccess: true, message:null, response: messageResponse })
        
    }
    catch(err){
        res.status(500).json({isSuccess: false, message:"Error in Getting messages", response: err })
    }
}
// End:- Get Conversation