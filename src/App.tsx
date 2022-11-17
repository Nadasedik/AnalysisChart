import React from "react";
import {  Navigate, Route, Routes } from "react-router-dom";
import Chart from "./components/Chart";
import Details from "./components/Details";

function App() {
  
  return (

    <Routes >
      <Route path="/chart" element={<Chart />} />
      <Route path="/details" element={<Details />} />      
      <Route path="*" element={<Navigate to="/chart" />} />
    </Routes>

  );
}

export default App;
