const mongoose = require("mongoose");

// Define Schema

const seatSchema =  new mongoose.Schema({
    seatNumber:{
        type:Number,
        required:true
    },
    row: {
        type:Number,
        required: true
    },
    booked:{
        type:Boolean,
        required:true
    }
})
//create Model
const seatModel = mongoose.model("seats" , seatSchema);

module.exports = seatModel