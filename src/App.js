import logo from './logo.svg';
import './App.css';
import Ginput from './Ginput';
import { useState } from 'react';
import Gdisplay from './Gdisplay';


function App() {
  const[submitFlag,setSubmitFlag] = useState(false)
  const[firstGame,setFirstGame]   = useState("")
  const [secondGame,setSecondGame]  = useState("")

  return (
    <div className="App">
        <header className="Navbar">
        <h1>Compare Quest</h1>
      </header>
        
      {submitFlag === false ? <Ginput setSubmitFlag={setSubmitFlag} setFirstGame={setFirstGame}  setSecondGame={setSecondGame}/> : <Gdisplay firstGame={firstGame} secondGame={secondGame}/>}

        
      
    </div>
  );
}

export default App;
