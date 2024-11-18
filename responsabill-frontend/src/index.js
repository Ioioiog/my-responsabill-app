// src/index.js
import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="root"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);