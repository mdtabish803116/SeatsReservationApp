const seatModel = require("../database/seat")

let seatsAvailable = 80;
let numberOfRows;
const seatArrangement = [];

function checkRowAvailability(row, numSeats) {
  const seatsInRow = seatArrangement[row - 1].seats;
  let consecutiveSeats = 0;
  for (let i = 0; i < seatsInRow.length; i++) {
    if (seatsInRow[i] === 0) {
      consecutiveSeats++;
      if (consecutiveSeats === numSeats) {
        return true;
      }
    } else {
      consecutiveSeats = 0;
    }
  }
  return false;
}
// Function to reserve seats
 function reserveSeats(numSeats) {
  const bookedSeats = [];
  if (numSeats > 7 || numSeats > seatsAvailable) {
    console.log("Invalid number of seats. Maximum of 7 seats can be booked at a time.");
    return;
  }
  let seatsToBook = numSeats;
  let row = 1;
  // Check for available seats in one row
  while (seatsToBook > 0 && row <= seatArrangement.length) {
    if (checkRowAvailability(row, numSeats)) {
      const seatsInRow = seatArrangement[row - 1].seats;
      for (let i = 0; i < seatsInRow.length; i++) {
        if (seatsInRow[i] === 0) {
          seatsInRow[i] = 1;
          if (row == 1){
              bookedSeats.push(i+1);
          }else {
              bookedSeats.push(i+1+7);
          }
          seatsAvailable--;
          seatsToBook--;
          if (seatsToBook === 0) {
            break;
          }
        }
      }
    }
    row++;
  }

  fetchAndSaveSeatsData(bookedSeats)
  console.log("bookedSeats" , bookedSeats)
  let dataSeats = []
  getSeatModel().then((seats) => {
      for(let i = 0 ; i < bookedSeats.length; i++){
        for(let j = 0; j < seats.length; j++){
            if (bookedSeats[i] === seats[j].seatNumber){
              dataSeats.push(seats[j])
            }
        }
      }
    
   }).catch((err) => {
    console.log(err)
  })

  return dataSeats
}

numberOfRows = Math.ceil((seatsAvailable - 3) / 7) + 1;
 
if (seatArrangement.length === 0) {
  for (let row = 1; row <= numberOfRows; row++) {
    let seatsInRow = row === numberOfRows ? 3 : 7;
    seatArrangement.push({row, seats: Array(seatsInRow).fill(0) });
  }

   getSeatModel().then((seatsData) => {
   
        for(let i = 0; i < seatsData.length; i++){
          if (seatsData[i].booked === true){
                let rows = seatsData[i].row
                seatArrangement[rows - 1].row = rows
                seatArrangement[rows - 1].seats[i%7] = 1
          }else {
            let rows = seatsData[i].row
            seatArrangement[rows-1].row = rows
            seatArrangement[rows-1].seats[i%7] = 0
          }
        }
       
   }).catch((err) => {
        console.log(err)
   })
  }


async function fetchAndSaveSeatsData(bookedSeats){
  try{
    let seats = await seatModel.find()
    for(let i = 0 ; i < bookedSeats.length; i++){
      for(let j = 0; j < seats.length; j++){
          if (bookedSeats[i] === seats[j].seatNumber){
            let seatsById = await seatModel.findById(seats[j].id)
             seatsById.booked = true
             await seatsById.save()
          }
      }
    }
 }catch(err){
    console.log(err)
  }
}

async function getSeatModel(){
  try {
    let seats = await seatModel.find()
    return seats
  }catch(err){
    console.log(err)
  }
}

module.exports = reserveSeats