const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../Handler/userhandler");
const { protect } = require("../Connection/auth");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

module.exports = router;
