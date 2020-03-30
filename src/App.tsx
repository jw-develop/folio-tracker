import React from 'react';
import './App.css';

import { InfoTable } from "./components/InfoTable";
import { SectorTable } from './components/SectorTable';
import { ValueTable } from './components/ValueTable';

// Documentation for API at https://financialmodelingprep.com/developer/docs/#Company-Profile

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <InfoTable></InfoTable>
      <SectorTable></SectorTable>
      <ValueTable></ValueTable>
    </div>
  );
}

export default App;
