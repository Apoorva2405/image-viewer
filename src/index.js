import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './screens/login/Login';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';

/*Rendering Login component as home page*/ 
ReactDOM.render(<Controller />, document.getElementById('root'));
registerServiceWorker();
