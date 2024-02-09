import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import { CalendarApp } from './CalendarApp'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CalendarApp />
  </BrowserRouter>,
)
