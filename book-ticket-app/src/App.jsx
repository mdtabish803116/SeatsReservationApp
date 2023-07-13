import React from 'react';
import './App.css';
import InputFeild from './components/InputFeild';
import Seats from './components/Seats';

function App() {
  return (
   <>  
    <h2>Seat Reservation</h2>
    <div className="App">
        <InputFeild/>
        <Seats/>
    </div>    
  </>
    
  );
}

export default App;
