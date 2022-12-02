const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const dbConnect = require("./dbConnect");
const User = require("./userModel");
const Admin = require("./adminModel");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
// execute database connection 
dbConnect();
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});



// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});


//

// register endpoint
app.post("/register/user", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        userId: request.body.userId,
        email: request.body.email,
        password: hashedPassword,
        productIds: [],
        auctionIds: []
      });

      // save the new user
      user.save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// register endpoint
app.post("/register/admin", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const admin = new Admin({
        adminName: request.body.adminName,
        adminId: request.body.adminId,
        password: hashedPassword,
      });

      // save the new user
      admin.save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Admin Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.post("/login/user", (request, response) => {
  // check if email exists
  User.findOne({ userId: request.body.userId })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            userId: user.userId,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "UserId not found",
        e,
      });
    });
});

// login endpoint

app.post("/login/admin", (request, response) => {
  // check if email exists
  Admin.findOne({ adminId: request.body.adminId })

    // if email exists
    .then((admin) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, admin.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              adminId: admin._id,
              adminEmail: admin.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            adminId: admin.adminId,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Admin not found",
        e,
      });
    });
});




app.post('/addProductId', async (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const user = await User.findOneAndUpdate({ userId: userId }, { $push: { "productIds": productId } }).then((result) => {
    res.status(201).send({
      message: "ProductIds added Suceessfully",
      result,
    });
  })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      res.status(500).send({
        message: "Error Adding ProductIds",
        error,
      });
    });
})

app.post('/addAuctionId', async (req, res) => {
  const userId = req.body.userId;
  const auctionId = req.body.auctionId;
  const user = await User.findOneAndUpdate({ userId: userId }, { $push: { "auctionIds": auctionId } }).then((result) => {
    res.status(201).send({
      message: "AuctionIds added Suceessfully",
      result,
    });
  })
    // catch error if the new user wasn't added successfully to the database
    .catch((error) => {
      res.status(500).send({
        message: "Error Adding AuctionIds",
        error,
      });
    });
})
// // free endpoint
// app.get("/free-endpoint", (request, response) => {
//   response.json({ message: "You are free to access me anytime" });
// });

// // authentication endpoint
// // authentication endpoint
// app.get("/auth-endpoint", auth, (request, response) => {
//   response.json({ message: "You are authorized to access me" });
// });



module.exports = app;
