const express = require("express");
const router= express.Router();
const {createHall}=require("../controllers/hall.controller")


router.post("/createhall",createHall);


module.exports = router;

