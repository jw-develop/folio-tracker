import React from 'react';
import { CSVLink } from 'react-csv';
import { CsvToHtmlTable } from "react-csv-to-table";
import { sectors, caps } from '../constants';
import { simplifyCSV } from '../util/Util';
import { capTier } from "../util/capTier";
import { profiles } from '../util/StockProfiles';

export class ValueTable extends React.Component<{}, {
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
      for (let i = 0; i < sectors.length; i++) {
        arr.push(" ");
      }
    }
    profiles.forEach(profile => {
      let i = 0;
      while (i < sectors.length && sectors[i] !== profile.sector)
        i++;
      grid[capTier(profile.mktCap)][i] = 
        ((parseFloat(grid[capTier(profile.mktCap)][i]) || 0) + 
        (parseFloat(profile.owned) * (profile.price))).toString();
      console.log(profile);
      this.setState({
        data: grid,
      });
    });
  }
  render() {
    return (
    <div>
      <header>-- Value Table</header>
      <button onClick={() => this.refresh()}>Refresh</button>
      <button><CSVLink headers={sectors} data={this.state.data} filename={"folio-export.csv"}>Download CSV</CSVLink></button>
      <CsvToHtmlTable id="mainTable" data={simplifyCSV(sectors, this.state.data)} csvDelimiter="," tableClassName="table" />
    </div>);
  }
}
