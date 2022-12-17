import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/home-style.css'
import './css/cart-style.css'
import './css/loader.css'
import './css/single-book-style.css'
import './css/read-me-style.css'
import './css/query.css'


import App from './App';
import { AppProvider } from './context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AppProvider>
      <App />
    </AppProvider>
  </>
);
