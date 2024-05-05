import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  BrowserRouter,
} from "react-router-dom";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Theme appearance="dark">
      <App />
    </Theme>
  </BrowserRouter>
)
