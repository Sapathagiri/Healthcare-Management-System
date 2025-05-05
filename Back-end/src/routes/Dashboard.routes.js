const express = require("express");
const { getStats } = require("../controller/Dashboard.controller");

const router = express.Router();

router.get("/", getStats);

module.exports = router;
