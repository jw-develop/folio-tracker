import React from 'react';
import { InfoTable } from "./components/InfoTable";
import './App.css';
import { SectorTable } from './components/SectorTable';

// Documentation for API at https://financialmodelingprep.com/developer/docs/#Company-Profile

export function capTier(cap: number) {
  if (cap > 85000000000) return 0;
  else if (cap > 10000000000) return 1;
  else if (cap > 2000000000) return 2;
  else return 3;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InfoTable></InfoTable>
        <SectorTable></SectorTable>
      </header>
    </div>
  );
}

export default App;
