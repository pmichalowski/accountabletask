import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import { Country } from "./pages/Country";
import { Details } from "./pages/Details";

function App() {
  return (
    <div>
      <header className="App-header">
        <h1>Accountable</h1>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/country" element={<Country />} />
            <Route path="/details" element={<Details />} />
            <Route path="*" element={<Navigate to="/country" />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
