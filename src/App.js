import React, { useState } from 'react';
import './App.css';
import Ginput from './Ginput';
import Gdisplay from './Gdisplay';

function App() {
  const [submitFlag, setSubmitFlag] = useState(false);
  const [firstGame, setFirstGame] = useState('');
  const [secondGame, setSecondGame] = useState('');

  return (
    <div className="App">
      <header className="Navbar">
        <h1>Compare Quest</h1>
      </header>
      
      {submitFlag ? (
        <Gdisplay firstGame={firstGame} secondGame={secondGame} />
      ) : (
        <Ginput 
          setSubmitFlag={setSubmitFlag} 
          setFirstGame={setFirstGame}  
          setSecondGame={setSecondGame} 
        />
      )}
    </div>
  );
}

export default App;
