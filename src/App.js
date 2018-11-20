import React, { Component } from 'react';
import './App.css';
import Pivot from './Pivot';

class App extends Component {

  
  render() {
    const initial_state = {
      rows: ["All_Traffic.src"],
      cols: ["All_Traffic.dest"],
      vals: ["sum_bytes"],
      aggregatorName: "Sum",
      colOrder: "value_z_to_a",
      rowOrder: "value_z_to_a",
    }
    return (
      <div className="App">
        <Pivot
        {...initial_state}
        ></Pivot>
      </div>
    );
  }
}

export default App;
