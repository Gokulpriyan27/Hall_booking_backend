const express = require("express");
const router = express.Router();
const {bookHall,listAllHalls,listAllCustomers,countCustomerBooking} = require("../controllers/booking.controller")

router.post("/bookhall",bookHall);

router.get("/halldetails",listAllHalls);

router.get("/customerdetails",listAllCustomers);

router.post("/count",countCustomerBooking)

module.exports = router;