import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CookiesProvider } from 'react-cookie'; // <-- 1. Import this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider> {/* <-- 2. Wrap your App component */}
      <App />
    </CookiesProvider>
  </React.StrictMode>
);