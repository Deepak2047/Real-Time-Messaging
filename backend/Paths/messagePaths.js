const express = require("express");

const { protect } = require("../Connection/auth");
const { allMessages, sendMessage } = require("../Handler/messagehandler");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;
