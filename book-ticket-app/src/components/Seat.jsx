import Styled from "styled-components";

const StyledDiv = Styled.div`
 height : 40px;
text-align : center;
color : ${props => props.booked ? 'yellow' : 'black'};
background-color :  ${props => props.booked ? 'red' : 'green'};
border-radius : 5px;
padding-top : 18px;
`
export default function Seat({data}) {
     console.log(data)
   
    return (
       <StyledDiv booked = {data.booked}>
           {data.seatNumber}
       </StyledDiv>
    )
}