import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'

import WebFont from 'webfontloader';

WebFont.load({
    google: {
      families: ['Titillium Web:300,400,700', 'sans-serif','kanit','Rubik','Tomorrow']
    }
});

ReactDOM.render(
       <BrowserRouter>
              <App />
       </BrowserRouter>
 
, document.getElementById('root'));

serviceWorker.unregister();
