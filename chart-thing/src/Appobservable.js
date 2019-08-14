import React, { Component, useState } from 'react';
import './App.css';
import { useObservable } from 'rxjs-hooks';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
// import { endpointUrls } from './config';
import { Line, defaults } from 'react-chartjs-2';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { tableDataDamn } from "./datafotable";

// import { sendEvents } from '../../server/server';

defaults.global.maintainAspectRatio = false

const stringObservable = Observable.create(observer => {
  const source = new EventSource('http://localhost:3000/');
  source.addEventListener('message', (messageEvent) => {
    console.log(messageEvent);
    observer.next(messageEvent.data);
  }, false);
})


// this.eventSource = new EventSource('http://localhost:3000/');
// this.eventSource.onmessage = function (event) {
//   console.log(event.data);
//   this.myDiv.value += event.data + "<br>";
// }

const [stringArray, setStringArray] = useState([]);


function App() {


  useObservable(
    state =>
      stringObservable.pipe(
        withLatestFrom(state),
        map(([state]) => {
          let updatedStringArray = stringArray;
          updatedStringArray.unshift(state);
          if (updatedStringArray.length >= 50) {
            updatedStringArray.pop();
          }
          setStringArray(updatedStringArray);
          return state;
        })
      )
  );
  return (
    <>
      {stringArray ? stringArray.map((message, index) => <p key={index}>{message}</p>) : <p>Loading...</p>}
    </>
  );
}
export default App;

    // render() {
    //   const data = {
    //     labels: [
    //       '10/04/2018', '10/05/2018',
    //       '10/06/2018', '10/07/2018',
    //       '10/08/2018', '10/09/2018',
    //       '10/10/2018', '10/11/2018',
    //       '10/12/2018', '10/13/2018',
    //       '10/14/2018', '10/15/2018'
    //     ],
    //     datasets: [
    //       {
    //         label: 'Temperature',
    //         data: [22, 19, 27, 23, 22, 24, 17, 25, 23, 24, 20, 19],
    //         fill: false,          // Don't fill area under the line
    //         borderColor: 'green'  // Line color
    //       }
    //     ]
    //   }
    // }