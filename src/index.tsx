import React from 'react';
import ReactDOM from 'react-dom';
import DigiSlotMachine from './components/DigiSlotMachine';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <h1 className='display-4'>Digimon World 1 Evolution Slot Machine!</h1>
      <p className='lead'>This is an evolution / digivolution tool for people who want to play Digimon World 1 without spoilers. Hit the button and you'll be provided random instructions for digivolving your digimon into another.</p>
      <DigiSlotMachine />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
