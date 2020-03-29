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
    this.state = {data: [[]]};
    this.refresh();
  }
  public refresh() {
    let grid = caps.map(e => [e]);
    for (let arr of grid) {
      for (let i = 0; i < 10; i++) {
        arr.push(" ");
      }
    }
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
  render() {
    return (
    <div>
      <button onClick={() => this.refresh()}>Refresh</button>
      <button><CSVLink headers={sectors} data={this.state.data} filename={"folio-export.csv"}>Download CSV</CSVLink></button>
      <CsvToHtmlTable id="mainTable" data={simplifyCSV(sectors, this.state.data)} csvDelimiter="," tableClassName="table" />
    </div>);
  }
}
