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

router.get("/students", async (req, res) => {
  let students = [];
  //Get all students
  const response = await db.collection("students").get();
  //Iterate over
  console.log(response);
  response.forEach((doc) => {
    let student = {};
    student.id = doc.id;
    student.name = doc.data().name;
    student.status = doc.data().status;

    // student.sport = doc.data().sport;
    //Push every elem into Obj Array
    students.push(student);
  });

  //Respond with student array
  res.json(students);
});

router.get("/students/:id", async (req, res) => {
  let name = await db.collection("students").doc(req.params.id).get();
  res.json(name);
});

// Create student
router.post("/students", checkAuthorization, async (req, res) => {
  console.log("Vrei sa adaugi un produs.");
  let student = {};
  student.name = req.body.name;
  student.status = req.body.status;
  const insert = await db.collection("students").add(student);

  res.json({ id: student.id });
});

//Edit student
router.put("/students/:id", checkAuthorization, async (req, res) => {
  console.log("Vrei sa actualizezi produsul cu id-ul: " + req.params.id);

  const response = await db
    .collection("students")
    .doc(req.params.id)
    .update(req.body);

  res.json({
    message: "Am modificat produsul cu id-ul " + req.body.id + " de pe server!",
  });
});

//Post student's sport
router.post("/students/sport/:id", async (req, res) => {
  console.log("Vrei sa actualizezi produsul cu id-ul: " + req.params.id);

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

router.get("/students/sport/:id", async (req, res) => {
  console.log("getting the sports");
  const response = await db
    .collection("students")
    .doc(req.params.id)
    .collection("sports")
    .get();

  let sports = [];
  console.log(response);
  response.forEach((doc) => {
    let sport = {};
    sport.id = doc.id;
    sport.name = doc.data().name;

    sports.push(sport);
  });
  res.json(sports);
});

//Delete students
router.delete("/students/:id", checkAuthorization, (req, res) => {
  console.log("Vrei sa stergi produsul cu id-ul: " + req.params.id);
  let id = req.params.id;
  // const sports = db
  //   .collection("students")
  //   .doc(id)
  //   .collection("sports")

  const student = db.collection("students").doc(id).delete();
  res.json({
    message: "Am sters produsul cu id ul" + req.params.id + " de pe server!",
  });
});

module.exports = router;
