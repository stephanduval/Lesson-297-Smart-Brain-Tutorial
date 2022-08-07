// import 'express'
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

// create app using express
const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "Johan",
      email: "johan@gmail.com",
      password: "cookies",
      entries: "0",
      joined: new Date(),
    },
    {
      id: "122",
      name: "Gill",
      email: "Gilly@gmail.com",
      password: "spookies",
      entries: "0",
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "john@gmail.com",
    },
  ],
};

// A basic route to make sure everything is working we are usint '/' the route
// we check the server using postman at localhost:3000
app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  bcrypt.compare(
    "apples",
    "$2a$10$um6i/75/fML2mLomrgcvbezyAzzzidcrhXmEkk1XuB9V/TWG65ViG",
    function (err, res) {
      // res == true
      console.log("first guess", res);
    }
  );
  bcrypt.compare(
    "broccolli",
    "$2a$10$lcK6P.w/NosQcVCFJSPGH.9DGlUXoriYdNKu5Qn.osxs1.FbxcMtq",
    function (err, res) {
      // res = false
      console.log("second guess", res);
    }
  );
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("Sucess");
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  //use Destructuring
  const { email, name, password } = req.body;
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("Not Found");
  }
});

app.post("/image", (request, response) => {
  const { id } = request.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return response.json(user.entries);
    }
  });
  if (!found) {
    response.status(400).json("Not Found");
  }
});

bcrypt.hash("bacon", null, null, function (err, hash) {
  // Store hash in your password DB.
});

// // Load hash from your password DB.

// listen on port 3000 for requests
app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*   
   DESIGN OF THE ROUTES: 
   THESE ARE THE ENDPOINTS WE WILL CREATE:

    / --> res = this is working
    /signin -- POST = sucess/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user    //Updates the user object with a new image

*/
