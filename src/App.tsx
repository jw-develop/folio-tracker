import React from 'react';
import { CSVLink } from 'react-csv';
import { CsvToHtmlTable } from "react-csv-to-table";
import './App.css';

// Documentation for API at https://intrinio.com/
const stocks: string[] = [
  "AAPL",
  "CHK",
  "CVS",
  "EOG",
  "EVBG",
  "MCD",
  "MSFT",
  "NRG",
  "NUE",
  "QDEL",
  "TDOC",
  "XOM"
]

class FolioTable extends React.Component <{}, { data: string[][] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: stocks.map(e => [e]),
    }
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          let grid = this.state.data;
          grid[0].push("babs")
          this.setState({
            data: grid,
          })
        }}>
          Add Val To Data
        </button>
        <button><CSVLink data={this.state.data}filename={"folio-export.csv"}>Download CSV</CSVLink></button>
        <CsvToHtmlTable
          id="mainTable"
          data={simplifyCSV(this.state.data)}
          csvDelimiter=","
          tableClassName="table"
        />
      </div>
    )
  }
}

function simplifyCSV(arrays: string[][]) {
  let toReturn = "";
  arrays.forEach(array => {
    array.forEach(x => {
      toReturn += x + ",";
    })
    toReturn += "\n";
  });
  return toReturn;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FolioTable></FolioTable>
      </header>
    </div>
  );
}

export default App;
