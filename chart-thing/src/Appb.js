import React, { Component } from 'react';
import './App.css';
import { Line, defaults, Bar } from 'react-chartjs-2';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { tableDataDamn } from './datafotable';

defaults.global.maintainAspectRatio = false

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data2: tableDataDamn()
    }

    this.columns = [
      {
        Header: "Instrument Name",
        accessor: "instrumentname"
      },
      {
        Header: "Counter Party",
        accessor: "counterparty"
      }
    ]
  }
  render() {
    const data1 = {
      labels: [
        '10/04/2018', '10/05/2018',
        '10/06/2018', '10/07/2018',
        '10/08/2018', '10/09/2018',
        '10/10/2018', '10/11/2018',
        '10/12/2018', '10/13/2018',
        '10/14/2018', '10/15/2018'
      ],
      datasets: [
        {
          label: 'Temperature',
          data: [22, 19, 27, 23, 22, 24, 17, 25, 23, 24, 20, 19],
          fill: false,          // Don't fill area under the line
          borderColor: 'green'  // Line color
        }
      ]
    }

    const data2 = {
      labels: [
        '10/04/2018', '10/05/2018',
        '10/06/2018', '10/07/2018',
        '10/08/2018', '10/09/2018',
        '10/10/2018', '10/11/2018',
        '10/12/2018', '10/13/2018',
        '10/14/2018', '10/15/2018'
      ],
      datasets: [
        {
          label: 'Sunshine?',
          data: [17, 25, 23, 24, 20, 19, 22, 19, 27, 23, 22, 24],
          fill: false,          // Don't fill area under the line
          borderColor: 'orange'  // Line color
        }
      ]
    }

    const data3 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Precipitation',
        backgroundColor: 'rgba(0,0,255,1)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0,10,250,0.4)',
        hoverBorderColor: 'rgba(0,0,255,1)',
        data: [25, 25, 20, 30, 29, 20, 26]
      }]
    };

    return (
      <div className="App">
        <header className="App-header">
          <h1 id="topTitle">Instruments n shizz</h1>
        </header>
        <div className="canvas-container">
          <Line data={data1} />
        </div>
        <div className="top-right">
          <Line data={data2} />
        </div>
        <div className="bottom-span">
          <Bar data={data3} />
        </div>
      </div>
    );
  }
}

export default App;