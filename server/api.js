/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Location = require("./models/location");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/locations", (req, res) => {
  Location.find({
    user: req.user._id,
  }).then((locations) => res.send(locations));
});

// should pass {name: ""}
router.post("/locations/new", auth.ensureLoggedIn, (req, res) => {
  // verify if the name isn't blank (can also be done in frontend)
  if (!req.body.name) {
    res.send({ error: "enter a name" });
  } else {
    Location.findOne({
      user: req.user,
      name: req.body.name,
    }).then((location) => {
      if (location) {
        res.send({ error: "you already have a location with this name" });
      } else {
        // no duplicate location was found, so we're creating a new one
        newLocation = new Location({
          user: req.user,
          name: req.body.name,
          items: [],
        });
        newLocation.save().then((newLocation) => res.send(newLocation));
      }
    });
  }
});

// should pass {product: ""}
router.get("/requests", (req, res) => {
  Request.find({ user: req.user._id }).then((requests) => {
    res.send(requests);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
