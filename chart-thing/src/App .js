import React, { Component } from 'react';
import './App.css';
import { Line, defaults } from 'react-chartjs-2';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { tableDataDamn } from "./datafotable";
// import Subscribe from 'react-observable-subscribe';
import { Observable } from 'rxjs';

// import { sendEvents } from '../../server/server';

defaults.global.maintainAspectRatio = false

class App extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: [],
      data2: tableDataDamn()
    }
    this.data = [22, 19, 27, 23, 22, 24, 17, 25]
    // const observable = Observable.create(observer => {
    //   this.eventSource = new EventSource('http://localhost:3000/');
    //   this.eventSource.onmessage = x => observer.next(this.data.push(x.data));
    //   this.eventSource.onerror = x => observer.error(x);
    // })
    const foo = new Observable(subscriber => {
      console.log('hello m9');
      subscriber.next(30);
      setTimeout(() => {
        subscriber.next(31);
      }, 2000);
      setTimeout(() => {
        subscriber.next(35);
      }, 2000);
      subscriber.complete();
    });

    foo.subscribe(x => {
      this.data.push(x);
      console.log(this.data);
    });

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
    const data = {
      labels: [
        '10/04/2018', '10/05/2018',
        '10/06/2018', '10/07/2018',
        '10/08/2018', '10/09/2018',
        '10/10/2018', '10/11/2018',
        '10/12/2018', '10/13/2018',
        '10/14/2018', 'S10/15/2018'
      ],
      datasets: [
        {
          label: 'Temperature',
          data: this.data,
          fill: false,          // Don't fill area under the line
          borderColor: 'green'  // Line color
        }
      ]
    }


    return (
      <div className="App">
        <header className="App-header">
          <h1>Responsive Linear chart using Chart.js</h1>
        </header>
        <article className="canvas-container">
          <Line data={data} />
        </article>
        <div className="datatable">
          <ReactTable
            data={this.state.data2}
            columns={this.columns}
          />
        </div>
        <div ref={this.myRef} />;
      </div>
    );
  }
}

export default App;
