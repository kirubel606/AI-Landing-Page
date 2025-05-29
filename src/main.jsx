import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { AppProvider } from './context/Appcontext'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
    <Router>
      <App />
      </Router>
    </AppProvider>
  </React.StrictMode>,
)
