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
  })
    .sort({ likecount: -1 })
    .sort({ timestamp: -1 })
    .then((proofs) => res.send(proofs));
});

router.post("/proofs/new", auth.ensureLoggedIn, (req, res) => {
  newProof = new Proof({
    user: req.user._id,
    username: req.body.username,
    icon: req.body.icon,
    theory: req.body.theory,
    text: req.body.text,
  });
  newProof.save().then((newProof) => res.send(newProof));
});

router.post("/proofs/delete", auth.ensureLoggedIn, (req, res) => {
  Proof.findOneAndDelete({
    _id: req.body.proofId,
  }).then((deletedProof) => res.send(deletedProof));
});

router.post("/proofs/like", auth.ensureLoggedIn, (req, res) => {
  Proof.findOne({
    _id: req.body.proofId,
  }).then((proof) => {
    // if the user hasn't already liked it and isn't the author
    const isAuthor = proof.user.toString() !== req.user._id.toString();
    const alreadyLiked = proof.likes.indexOf(req.user._id) !== -1;
    if (isAuthor && !alreadyLiked) {
      proof.likecount++;
      proof.likes.push(req.user._id);
      proof.save().then((likedProof) => res.send(likedProof));
    } else {
      res.send(proof);
    }
  });
});

router.post("/proofs/unlike", auth.ensureLoggedIn, (req, res) => {
  Proof.findOne({
    _id: req.body.proofId,
  }).then((proof) => {
    // if the user has already liked it and isn't the author
    const isAuthor = proof.user.toString() !== req.user._id.toString();
    const likeIndex = proof.likes.indexOf(req.user._id);
    const alreadyLiked = likeIndex !== -1;
    if (isAuthor && alreadyLiked) {
      proof.likecount--;
      proof.likes.splice(likeIndex, 1);
      proof.save().then((likedProof) => res.send(likedProof));
    } else {
      res.send(proof);
    }
  });
});

router.post("/settings/username", auth.ensureLoggedIn, (req, res) => {
  User.findOne({ username: req.body.username }).then((userWithUsername) => {
    // if nobody already has that username, change it
    if (!userWithUsername) {
      Proof.updateMany({ user: req.user._id }, { $set: { username: req.body.username } }).then(
        (updatedProofs) => {
          User.findOne({
            _id: req.user._id,
          }).then((user) => {
            user.username = req.body.username;
            user.save().then((updatedUser) => res.send(updatedUser));
          });
        }
      );
    } else {
      // if someone already has the username, send error
      res.send({ error: "duplicate username" });
    }
  });
});

router.post("/settings/icon", auth.ensureLoggedIn, (req, res) => {
  Proof.updateMany({ user: req.user._id }, { $set: { icon: req.body.icon } }).then(
    (updatedProofs) => {
      User.findOne({
        _id: req.user._id,
      }).then((user) => {
        user.icon = req.body.icon;
        user.save().then((updatedUser) => res.send(updatedUser));
      });
    }
  );
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
