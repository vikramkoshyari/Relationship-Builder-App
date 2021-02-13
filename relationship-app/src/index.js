import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Typography,Divider} from 'antd';
const {Title}=Typography
ReactDOM.render(
  <React.StrictMode>
  
      <Title className='title'>Relationship App</Title>
      <Divider/>
      <App />
      <div className='em'>
        
      </div>
  
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
