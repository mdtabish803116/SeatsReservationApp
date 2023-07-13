const seatModel = require("../database/seat")
const reserveSeats = require("./reserveSeat")

async function fetchAllSeats(req,res,next){
    const seats = await seatModel.find()
    return res.status(201).send({
        data:seats
    })
}

async function bookSeats(req, res , next){
    const {seats} = req.body
    if (seats > 7){
        return res.send({
            message : "Cant be more than 7",
        })
    }else {
        try {
            let dataSeats =  reserveSeats(seats)
            return res.send({
                message : "seat has been booked",
                data : dataSeats
            })
        }catch(err){
            return res.status(400).send({
                message : err.message,
            })
        }
    }
}

async function resetAllSeats(req, res){
    let seats = await seatModel.find()
    for(let i = 0; i < seats.length;i++){
        let seatsById = await seatModel.findById(seats[i].id)
        seatsById.booked = false
        await seatsById.save()
    }
    try {
        return res.status(201).send({
            message : "seats reset"
        })
    }catch(err){
        return res.status(400).send({
            message : err.message,
        })
    }
   
}

module.exports = {
    fetchAllSeats,
    bookSeats,
    resetAllSeats
}