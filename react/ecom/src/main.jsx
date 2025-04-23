import React from 'react';
import { createRoot } from 'react-dom/client'
import store from './redux/store';
import App from './App.jsx'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
