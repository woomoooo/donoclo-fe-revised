import React from 'react';
import './App.css';
import Router from "./common/route";
import AxiosInit from "./common/AxiosInit";

function App() {
  return (
    <div className="App">
      <AxiosInit />
      <Router />
    </div>
  );
}

export default App;
