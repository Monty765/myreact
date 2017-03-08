import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

let baseUrl='http://pokeapi.co/api/v2';
ReactDOM.render(
  <App BaseUrl={baseUrl}/>,
  document.getElementById('root')
);
