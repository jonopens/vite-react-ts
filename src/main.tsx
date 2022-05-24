import ReactDOMClient from 'react-dom/client';
import React from 'react';
import App from './App';

const targetElement = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(targetElement);

root.render(<App />);
