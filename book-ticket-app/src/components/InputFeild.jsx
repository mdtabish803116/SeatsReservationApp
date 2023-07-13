import React from "react";
import "../styles/InputFeild.css";

function reserveSeats(){
   let inputValue = document.getElementById("input").value
   console.log("inputValuei" , inputValue)
   if(inputValue > 7){
      alert("Can not Book ticket more than 7 at a time")
   }else if (inputValue < 0){
      alert("Cant be negative value")
   }else {
    postSeatsData(inputValue)
   }
}

async function postSeatsData(seats) {
  let payload = {"seats" : seats}
    await fetch("http://localhost:3001/seats", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((res) => res.json())
      .then((res) => {
        alert(`${seats} reserved`)
        getSeatsData()
      }).catch((err) => {
       alert("something wrong")
      })
      .finally(() => {
      });
 }

 function resetAllSeats(){
      resetSeatsData()
 }

 async function resetSeatsData() {
    await fetch("http://localhost:3001/reset/all", {
    }).then((res) => res.json())
      .then((res) => {
        alert("Call seats reset")
      }).catch((err) => {
        alert("something went wrong")
      })
      .finally(() => {
      });
 }

export default function InputFeild(){
    return (
        <div>
            <div className="showSeats">
                  <div className = "redBox"></div>
                  <div>Booked Seats</div>
            </div>
            <div className="showSeats">
                  <div className = "greenBox"></div>
                  <div>Available Seats</div>
            </div>
            <div></div>
            <div style = {{"marginLeft" : "10px" , "marginTop":"10px"}}>Number Of Seats</div>
            <div style = {{"marginLeft" : "10px" , "marginTop":"5px"}}>Ex : 4</div>
            <div className = "inputBox">
                      <div>
                            <input type = "number" id = "input" style = {{"width" : "98%","height" : "25px","borderRadius" : "5px"}}></input>
                      </div>
                      <div onClick = {reserveSeats}>Reserve Seats</div>
            </div>
            <div className="ResetActionDiv" onClick = {resetAllSeats}>Reset All Seats</div>
        </div>
      );
}