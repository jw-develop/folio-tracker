import React from 'react';
import { CSVLink } from 'react-csv';
import { headers1, stocks } from '../constants';
import { CsvToHtmlTable } from "react-csv-to-table";
import { simplifyCSV } from '../util/Util';

export class InfoTable extends React.Component <{}, { data: string[][] }> {
    constructor(props: any) {
      super(props);
      this.state = {
        data: stocks.map(e => [e[0]]),
      }
      this.refresh();
    }
    public refresh() {
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
          <header>-- Info Table</header>
          <button onClick={() => this.refresh()}>Refresh</button>
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