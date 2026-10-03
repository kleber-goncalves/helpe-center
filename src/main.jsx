import { StrictMode } from 'react'
import { hydrateRoot } from "react-dom/client"
import './App.css'
import App from './App.jsx'

import { initializeAccessibility } from "./lib/accessibility";

initializeAccessibility();
hydrateRoot(document.getElementById("root"),
  <StrictMode>
    <App />
  </StrictMode>,
)
