import React from 'react';
import { CSVLink } from 'react-csv';
import { CsvToHtmlTable } from "react-csv-to-table";
import { sectors, stocks, caps } from '../constants';
import { simplifyCSV } from '../util/Util';
import { capTier } from '../App';

export class SectorTable extends React.Component<{}, {
  data: string[][];
}> {
  constructor(props: any) {
    super(props);
    let grid = caps.map(e => [e]);
    for (let arr of grid) {
      for (let i = 0; i < 10; i++) {
        arr.push(" ");
      }
    }
    this.state = {
      data: grid,
    };
    this.addColumns();
  }
  public addColumns() {
    if (this.state) {
      let grid = this.state.data;
      stocks.forEach(stock => {
        fetch("https://financialmodelingprep.com/api/v3/company/profile/" + stock)
          .then(async (e) => {
            const response = await e.json();
            const profile = response.profile;
            let i = 0;
            while (i < sectors.length && sectors[i] !== profile.sector)
              i++;
            grid[capTier(profile.mktCap)][i] = grid[capTier(profile.mktCap)][i] + stock + " " + profile.mktCap + " ";
            console.log(profile);
            this.setState({
              data: grid,
            });
          });
      });
    }
  }
  render() {
    return (<div>
      <button onClick={() => {
        let grid = this.state.data;
        grid[0].push("babs");
        this.setState({
          data: grid,
        });
      }}>
        Add Val To Data
        </button>
      <button onClick={() => this.addColumns()}>
        Add Prices
        </button>
      <button><CSVLink headers={sectors} data={this.state.data} filename={"folio-export.csv"}>Download CSV</CSVLink></button>
      <CsvToHtmlTable id="mainTable" data={simplifyCSV(sectors, this.state.data)} csvDelimiter="," tableClassName="table" />
    </div>);
  }
}
