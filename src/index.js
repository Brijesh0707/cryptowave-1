import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {BrowserRouter as Router} from "react-router-dom";
import ContextCrypto from './Context-crypto';
import "react-alice-carousel/lib/alice-carousel.css";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  <Router>
  <ContextCrypto>
    <App />
    </ContextCrypto>
  </Router>

  </React.StrictMode>
);

reportWebVitals();
