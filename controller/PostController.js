const Post = require("../models/Post");
const Users = require("../models/Users");

exports.CreatePost = async (req,res)=>{
    try{
        const newPost = new Post(req.body);
        const savePost = await newPost.save();
        res.status(200).json({"SUCCESS": true});
    }
    catch(err){
        res.status(400).json(err);
    }
}


exports.UpdatePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(req.body.userId === post.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("Your Post has been updated successfully");
        }else{
            res.status(403).json("You can only update your post")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.DeletePost = async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne({"_id": req.params.id});
            res.status(200).json("Your post has been deleted successfully");
        }
        else{
            res.status(403).json("You can only delete your post")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
}


exports.GetPost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        const { _id, userId, ...other} = post._doc
        res.status(200).json(other);
    }
    catch(err){
        res.status(500).json(err);
    }
}

exports.LikeDisLikePost = async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
             await  post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("You Like the Post");
        }
        else{
             await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("You Dislike the Post");
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.TimeLinePost = async(req, res)=>{
    try{
        const currentUser = await Users.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendsPost = await Promise.all(
            currentUser.following.map(friendId=>{
                return Post.find({userId: friendId})
            })
        )
        // const friendsPostArr = ...friendsPost;
        // res.status(200).json([...userPosts, ...(...friendsPost)])
        if(userPosts.length===0 || friendsPost.length === 0){
                const AllPosts = await Post.find();
            res.status(200).json(AllPosts)
                
        }else{
            res.status(200).json(userPosts.concat(...friendsPost))
        }

        // res.status(200).json(friendsPost)
        
    }
    catch(err){
        res.status(500).json(err);

    }
}

exports.GetUserPosts = async(req, res)=>{
    try{
        const currentUser = await Users.findOne({userName:req.params.userName});
        const userPosts = await Post.find({userId: currentUser._id});
        res.status(200).json(userPosts)
        
    }
    catch(err){
        res.status(500).json(err);

    }
}