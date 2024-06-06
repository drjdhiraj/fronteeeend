import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId="22180608558-4eg3qja95kvuvqslhdqf5regcdd02lr4.apps.googleusercontent.com"
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}> <App /> </GoogleOAuthProvider>;
       
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
