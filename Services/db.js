const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/socialmedia", () => {
  console.log("mongodb connected successfully");
});

const User =mongoose.model('User',{
    uname:String,
    name:String,
    pswd:Number,
    email:String,
    bio:String,
    image:String,
    post:[]
})

const Post = mongoose.model('Post',{
    uname:String,
    image:String,
    postimage:String,
    caption:String
})


module.exports = {
    User,
    Post
    
}