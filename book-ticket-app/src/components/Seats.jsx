import React from "react"
import Seat from "./Seat";
import "../styles/Seats.css";

export default function Seats(){

    const [seatData , setSeatData] = React.useState([])
    const [loading , setLoading] = React.useState(false)
    const [error , setError] = React.useState(false)

    async function getSeatsData() {
        setLoading(true);
        await fetch("http://localhost:3001/seats/all", {
        }).then((res) => res.json())
          .then((res) => {
            setSeatData(res.data)
            console.log(res.data)
          }).catch((err) => {
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
     }

     React.useEffect(()=> {
        getSeatsData()
    }, [])
    
    return (
        <div>  
            <div className="gridItem">
             {
             seatData?.map((obj) => {  
               return (<Seat key = {obj.id} data = {obj}/>)
              })
             }
            </div>

        </div>
      
        
      );
}
