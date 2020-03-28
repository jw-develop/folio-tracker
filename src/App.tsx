import React from 'react';
import { CSVLink } from 'react-csv';
import { CsvToHtmlTable } from "react-csv-to-table";
import { headers, stocks } from './stocks';
import { simplifyCSV } from './Util';
import './App.css';

// Documentation for API at https://financialmodelingprep.com/developer/docs/#Company-Profile

class FolioTable extends React.Component <{}, { data: string[][] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: stocks.map(e => [e]),
    }
  }
  public addColumns() {
    if (this.state) {
      let grid = this.state.data;
      grid.forEach(arr => {
        fetch("https://financialmodelingprep.com/api/v3/company/profile/" + arr[0])
        .then(async e => {
          const response = await e.json();
          const profile = response.profile;
          console.log(profile);
          arr[1] = profile.price
          arr[2] = profile.sector;

          this.setState({
            data: grid,
          })
        })
      });
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
        <button onClick={() => this.addColumns()}>
          Add Prices
        </button>
        <button><CSVLink headers={headers} data={this.state.data} filename={"folio-export.csv"}>Download CSV</CSVLink></button>
        <CsvToHtmlTable
          id="mainTable"
          data={simplifyCSV(headers,this.state.data)}
          csvDelimiter=","
          tableClassName="table"
        />
      </div>
    )
  }
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
