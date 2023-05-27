const express = require("express");
const router = express.Router();

const {register} =require("../controllers/auth.controller")

//controller import


router.post("/register", register);


// router.post("/login", login);



module.exports = router;
