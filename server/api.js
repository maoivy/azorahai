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
const Theory = require("./models/theory");
const Proof = require("./models/proof");

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
  } else {
    User.findOne({
      _id: req.user._id,
    }).then((user) => {
      res.send(user);
    });
  }
});

const CHARACTERS = ["Daenerys Targaryen", "Jon Snow"];
const ACTIONS = ["is Benjen", "is Rhaegar", "is Quaithe"];
const CATEGORIES = ["secret identity"];

// generates a random theorym, no filters for now
// TODO: FIND A BETTER WAY TO BUILD THE THEORIES DATABASE
router.get("/theories", (req, res) => {
  // generate a random theory
  const character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  Theory.findOne({
    character: [character],
    action: action,
    category: category,
  }).then((theory) => {
    // if theory found, return it
    if (theory) {
      res.send(theory);
    } else {
      newTheory = new Theory({
        text: character + " " + action,
        character: [character],
        action: action,
        category: category,
      });
      newTheory.save().then((theory) => res.send(theory));
    }
  });
});

// gets all the proofs associated with a given theory
// should pass { theoryId: theoryId }
router.get("/proofs", (req, res) => {
  Proof.find({
    theory: req.query.theory,
  }).then((proofs) => res.send(proofs));
});

router.post("/proofs/new", (req, res) => {
  newProof = new Proof({
    user: req.user._id,
    username: req.body.username,
    theory: req.body.theory,
    text: req.body.text,
  });
  newProof.save().then((newProof) => res.send(newProof));
});

router.post("/proofs/delete", (req, res) => {
  Proof.findOneAndDelete({
    _id: req.body.proofId,
  }).then((deletedProof) => res.send(deletedProof));
});

router.post("/settings", (req, res) => {
  User.findOne({
    _id: req.user._id,
  }).then((user) => {
    user.username = req.body.username;
    user.save().then((updatedUser) => res.send(updatedUser));
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
