const express = require('express');
const { fetchAllSeats, bookSeats, resetAllSeats } = require('../handlers/seat');
const seatRouter = express.Router();

seatRouter.get("/seats/all" , fetchAllSeats)
seatRouter.post("/seats" ,bookSeats)
seatRouter.get("/reset/all" ,resetAllSeats)

module.exports = seatRouter