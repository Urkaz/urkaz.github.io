import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.css';
import 'aos/dist/aos.css'
import 'glightbox/dist/css/glightbox.css'

import AOS from 'aos';
AOS.init();

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'glightbox/dist/js/glightbox.min.js';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
