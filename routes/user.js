const express = require("express");

const fs = require("fs");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const CONSTANTS = require("../constants");
const users = require("../usersDetails/users.json");
router.post(
  "/signup",
  body("name").isLength({ min: 3 }),
  body("password").isLength({ min: 3 }),
  (req, res) => {
    console.log("signup route");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(CONSTANTS.NOT_FOUNT).json({ errors: errors.array() });
    }
    users.push({ name: req.body.name, password: req.body.password });
    const fileData = fs.writeFileSync(
      "./usersDetails/users.json",
      JSON.stringify(users)
    );
    console.log(fileData);
    res.status(CONSTANTS.OK).send(users);
  }
);

router.post("/login", (req, res) => {
  console.log("login route");
  for (let i = 0; i < users.length; i++) {
    if (users[i].name == req.body.name) {
      // check for password
      if (users[i].password == req.body.password) {
        console.log("password success");
        // navigate the user
      } else {
        console.log("Invalid Password");
        return res
          .status(CONSTANTS.NOT_FOUNT)
          .json({ errors: "Invalid Password" });
        break;
      }
    }
  }
  res.status(200).send(users);
});

router.get("/list", (req, res) => {
  res.status(CONSTANTS.OK).send(users);
});
module.exports = router;
