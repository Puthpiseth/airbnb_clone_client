import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppC from './utils/context/appContext';
import AuthContext from './utils/context/AuthContext';

ReactDOM.render(
    <AppC>
      <AuthContext>
        <App />
      </AuthContext>
    </AppC>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
