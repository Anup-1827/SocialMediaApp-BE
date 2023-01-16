const router = require('express').Router();
const body_parser = require('body-parser');

// Start: Importing Controller
const UsersController  = require('../controller/UserController');
const AuthController = require('../controller/AuthController');
const PostController = require('../controller/PostController');
const ConversationController = require("../controller/ConversationController");
const MessageController = require("../controller/MessageController");

// Start: Creating Router
    //Start:--Auth
    router.post('/auth/register', AuthController.Register);
    router.post('/auth/login', AuthController.Login);
    //End:--Auth

    //Start:--User
    router.put('/users/:id', UsersController.UpdateUser);
    router.delete('/users/:id', UsersController.DeleteUser);
    router.get('/users/', UsersController.GetUser);
    router.put('/users/:id/follow', UsersController.FollowUser);
    router.put('/users/:id/unfollow', UsersController.UnFollowUser);
    //End:--User

    // Start:--Post
    router.post('/post', PostController.CreatePost);
    router.get('/post/:id', PostController.GetPost);
    router.put('/post/:id', PostController.UpdatePost);
    router.delete('/post/:id', PostController.DeletePost);
    router.put('/post/:id/likeDislike', PostController.LikeDisLikePost);
    router.get('/post/timeline/:userId', PostController.TimeLinePost);
    router.get('/post/getUserPosts/:userName', PostController.GetUserPosts)
    // End:--Post

    // Start:- Conversation
    router.post("/conversation", ConversationController.SaveConverstion);
    router.get("/conversation/:userId", ConversationController.GetConversation);
    // End:- Conversation

    // Start:- Message
    router.post("/message", MessageController.SaveMessage)
    router.get("/message/:conversationId", MessageController.GetConversation)
    // End:- Message


// End: Creating Router

module.exports=  router;