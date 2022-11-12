import * as dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import DigiSlotMachine from './components/DigiSlotMachine';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


dotenv.config();

const AppTitle = styled.h1`
  text-transform: uppercase;
  font-size: xxx-large;
  color: #000;
  padding-bottom: 0;
`;

const AppSubline = styled.p`
  text-transform: uppercase;
  font-size: 20px;
  color: #000;
`;

ReactDOM.render(
  <React.StrictMode>
      
    <div className="App">
      <AppTitle>Digimon Evolution Slots!</AppTitle>
      <AppSubline>Spin the wheel below for a random collection of care attributes that will give you a unique Champion evolution!</AppSubline>
      <DigiSlotMachine />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
