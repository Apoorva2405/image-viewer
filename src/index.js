import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './screens/login/Login';
import registerServiceWorker from './registerServiceWorker';

/*Rendering Login component as home page*/ 
ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
