const express = require("express");

const cors = require("cors");

const jwt = require("jsonwebtoken");
const dataservice = require("./Services/dataservice");

const server = express();

server.use(
  cors({
    origin: "http://localhost:4200",
  })
);

server.use(express.json());

server.listen(3000, () => {
  console.log("Social media server started at port 3000");
});

//token verify middleware

const jwtmiddleware = (req, res, next) => {
  const token = req.headers["access-token"];
  console.log(token);
  try {
    jwt.verify(token, "supersecretkeyabc");
    next();
  } catch {
    res.status(401).json({
      message: "please login",
    });
  }
};

server.post("/register", (req, res) => {
  console.log(req.body);
  dataservice
    .Register(req.body.name, req.body.uname, req.body.pswd)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

server.post("/login", (req, res) => {
  console.log(req.body);
  dataservice.Login(req.body.uname, req.body.pswd).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

server.post("/getuser", jwtmiddleware, (req, res) => {
  console.log(req.body.uname);
  dataservice.getUser(req.body.uname).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

//add new post
server.post("/addnewpost", jwtmiddleware, (req, res) => {
  console.log(req.body);
  dataservice
    .addPost(req, req.body.uname, req.body.image, req.body.caption)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

//addprofilepicture
server.post("/editProfile", jwtmiddleware, (req, res) => {
  console.log(req.body);
  dataservice
    .editProfile(req.body.uname, req.body.name, req.body.bio, req.body.image)
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

//getallpost
server.get("/getAllpost", jwtmiddleware, (req, res) => {
  console.log(req.body);
  dataservice.getAllpost().then((result) => {
    res.status(result.statusCode).json(result);
  });
});

//getAlldm
server.get("/getAlldm", jwtmiddleware, (req, res) => {
  console.log(req.body);
  dataservice.getAlldm().then((result) => {
    res.status(result.statusCode).json(result);
  });
});

