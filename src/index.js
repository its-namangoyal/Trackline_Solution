import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoadScript } from "@react-google-maps/api";

<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  integrity="sha384-pzjw8f+ua7Kw1TIq3mCNmQWf94iRWG2S2YBjG4zl5cJ0TYxPZcF5Qx5RvvD1R2U3"
  crossorigin="anonymous"
/>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <LoadScript
        googleMapsApiKey={
          process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
          "AIzaSyAmQ2WFmMKxZI8t7sh79U4Ryy0ZcmXta9s"
        }
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </LoadScript>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
