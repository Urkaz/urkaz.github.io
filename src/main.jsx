import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import AOS from 'aos';
AOS.init();

import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
