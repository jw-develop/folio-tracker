import React from 'react';
import { CSVLink } from 'react-csv';
import { CsvToHtmlTable } from "react-csv-to-table";
import { headers1, sectors, stocks, caps } from './stocks';
import { simplifyCSV } from './Util';
import './App.css';
import { exists } from 'fs';
import { exit } from 'process';

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
        <button><CSVLink headers={headers1} data={this.state.data} filename={"folio-export.csv"}>Download CSV</CSVLink></button>
        <CsvToHtmlTable
          id="mainTable"
          data={simplifyCSV(headers1,this.state.data)}
          csvDelimiter=","
          tableClassName="table"
        />
      </div>
    )
  }
}

function capTier(cap: number) {
  if (cap > 85000000000) return 0;
  else if (cap > 10000000000) return 1;
  else if (cap > 2000000000) return 2;
  else return 3;
}

class FolioTable2 extends React.Component <{}, { data: string[][] }> {
  constructor(props: any) {
    super(props);
    let grid = [["Mega"],["Large"],["Medium"],["Small"]];
    for (let arr of grid) {
      for (let i = 0;i < 10;i++) {
        arr.push(" ");
      }
    }
    this.state = {
      data: grid,
    }
  }
  public addColumns() {
    if (this.state) {
      let grid = this.state.data;
      stocks.forEach(stock => {
        fetch("https://financialmodelingprep.com/api/v3/company/profile/" + stock)
        .then(async e => {
          const response = await e.json();
          const profile = response.profile;
          let i = 0;
          while (i < sectors.length && sectors[i] !== profile.sector) i++;
          grid[capTier(profile.mktCap)][i] = grid[capTier(profile.mktCap)][i] + stock + " " + profile.mktCap + " ";
          console.log(profile);

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
        <button><CSVLink headers={sectors} data={this.state.data} filename={"folio-export.csv"}>Download CSV</CSVLink></button>
        <CsvToHtmlTable
          id="mainTable"
          data={simplifyCSV(sectors,this.state.data)}
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
        {/* <FolioTable></FolioTable> */}
        <FolioTable2></FolioTable2>
      </header>
    </div>
  );
}

export default App;
