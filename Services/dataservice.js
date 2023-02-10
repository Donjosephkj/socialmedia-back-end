const db = require("./db");
const jwt = require("jsonwebtoken");

//Register
const Register = (name, uname, pswd) => {
  return db.User.findOne({
    uname,
  }).then((result) => {
    if (result) {
      return {
        statusCode: 401,
        message: "Username Already Exist..  Try a different username.",
      };
    } else {
      //to add new user
      const newUser = new db.User({
        uname: uname,
        name: name,
        pswd: pswd,
        email: "",
        bio: "",
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
        post: [],
      });
      newUser.save();

      return {
        statusCode: 200,
        message: "Successfully Registered",
      };
    }
  });
};

//login

const Login = (uname, pswd) => {
  return db.User.findOne({
    uname,
    pswd,
  }).then((result) => {
    if (result) {
      const token = jwt.sign(
        {
          currentUname: uname,
        },
        "supersecretkeyabc"
      );
      return {
        statusCode: 200,
        message: "Login successfull",
        user: result,
        token,
      };
    } else {
      return {
        statusCode: 401,
        message: "Invalid Username Or Password",
      };
    }
  });
};

//getUser

const getUser = (uname) => {
  return db.User.findOne({
    uname,
  }).then((result) => {
    if (result) {
      return {
        statusCode: 200,
        user: result,
      };
    } else {
      return {
        statusCode: 401,
        message: "Something Went Wrong",
      };
    }
  });
};

//addpost

const addPost = (req, uname, image, caption) => {
  return db.User.findOne({
    uname,
  }).then((result) => {
    if (result) {
      result.post.push(req.body);
      const newpost = new db.Post({
        uname:uname,
        image:result.image,
        postimage:image,
        caption:caption
      })
      newpost.save()
      result.save();
      return {
        statusCode: 200,
        message: "Posted Sucessfully",
      };
    } else {
      return {
        statusCode: 401,
        message: "something went wrong",
      };
    }
  });
};

//editprofile

const editProfile = (uname, name, bio, image) => {
  return db.User.findOne({
    uname,
  }).then((result) => {
    if (result) {
      result.name = name;
      result.bio = bio;
      result.image = image;
      result.save()
      return{
        statusCode:200,
        message:"Profile edited"
      }
    }
    else{
      return{
        statusCode:401,
        message:'something went wrong'
      }
    }
  });
};

//getallpost
const getAllpost = ()=>{
  return db.Post.find()
  .then(result=>{
    if(result){
      return{
        statusCode:200,
        posts:result
      }
    }
    else{
      return{
        statusCode:401,
        message:"posts are empty"
      }
    }
  })
}
//getAlldm

const getAlldm = ()=>{
return db.User.find()
.then(result=>{
  if(result){
    return{
      statusCode:200,
      alluser:result
    }

  }
  else{
    return{
      statusCode:401,
      messsage:"no users found"
    }
  }
})
}

module.exports = {
  Register,
  Login,
  getUser,
  addPost,
  editProfile,
  getAllpost,
  getAlldm
};
