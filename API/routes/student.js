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
  const response = await db.collection("students").get();

  console.log(response);
  response.forEach((doc) => {
    let student = {};

    student.id = doc.id;
    student.name = doc.data().name;
    student.program = doc.data().program;

    students.push(student);
  });
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
  student.program = req.body.program;
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

//Delete students
router.delete("/students/:id", checkAuthorization, (req, res) => {
  console.log("Vrei sa stergi produsul cu id-ul: " + req.params.id);
  let id = req.params.id;
  const students = db
    .collection("students")
    .doc(id)
    .collection("sports")
    .listDocuments()
    .then((val) => {
      val.map((val) => {
        val.delete();
      });
    });
  const student = db.collection("students").doc(id).delete();
  res.json({
    message: "Am sters produsul cu id ul" + req.params.id + " de pe server!",
  });
});

module.exports = router;
