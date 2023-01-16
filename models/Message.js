const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
    {
        conversationId:{
            type: String,
            require: true
        },
        senderId:{
            type: String,
            require: true
        },
        text:{
            type: String
        }
    },
    {
        timestamps :true
    }
)

module.exports = mongoose.model('message', MessageSchema);