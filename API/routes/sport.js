var express = require("express");
var router = express.Router();
var db = require("../database");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var faker = require("faker");

const secret = "portocala";

//Check auth
function checkAuthorization(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(req.token, secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt) {
          res.json({ message: "Your token expired!" });
        } else {
          res.json({ message: "Decoding error!" });
        }
      } else {
        console.log(decoded.email);
        next();
      }
    });
  } else {
    res.json({ message: "Missing token!" });
  }
}

//Post student's sport
router.post("/students/sport/:id", checkAuthorization, async (req, res) => {
  console.log("Vrei sa adaugi produsul cu id-ul: " + req.params.id);

  // const data = await db.collection("students").doc(req.params.id).get();
  // const student = data.data();
  // console.log(student);
  let obj = {};
  obj.name = req.body.name;

  let response = await db
    .collection("students")
    .doc(req.params.id)
    .collection("sports")
    // .doc(req.params.sportId)
    // .get();
    .add(obj);

  res.json(response);
});

//Delete student's sport
router.delete(
  "/students/sport/:id/:sportId",
  checkAuthorization,
  async (req, res) => {
    console.log("Vrei sa stergi produsul cu id-ul: " + req.params.id);

    let obj = {};
    obj.name = req.body.name;

    let response = await db
      .collection("students")
      .doc(req.params.id)
      .collection("sports")
      // .doc(req.params.sportId)
      // .get();
      .doc(req.params.sportId)
      .delete();

    res.json(
      "Am sters sportul celui cu idul" +
        req.params.id +
        " cu id ul" +
        req.params.sportId +
        " de pe server!"
    );
  }
);

//Put student's sport
router.put(
  "/students/sport/:id/:sportId",
  checkAuthorization,
  async (req, res) => {
    console.log("Vrei sa editezi studentul cu id-ul: " + req.params.id);

    // const data = await db.collection("students").doc(req.params.id).get();
    // const student = data.data();
    // console.log(student);
    let obj = {};
    obj.name = req.body.name;

    let response = await db
      .collection("students")
      .doc(req.params.id)
      .collection("sports")
      .doc(req.params.sportId)
      .update(obj);

    res.json(response);
  }
);

module.exports = router;
