import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//  measuring performance in  app, pass a function
// to log results (for example: reportWebVitals(console.log))
//  send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();