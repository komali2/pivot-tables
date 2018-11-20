import React, { Component } from 'react';
import './App.css';
import Pivot from './Pivot';
import traffic_bytes from './traffic_bytes';


const initial_state = {
  rows: ["source_ip"],
  cols: ["destination_ip"],
  vals: ["sum_bytes"],
  aggregatorName: "Sum",
  colOrder: "value_z_to_a",
  rowOrder: "value_z_to_a",
  valueFilter: undefined,
  data: traffic_bytes,
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = initial_state;
  }
  handleChildChange = (config)=>{
    var config_copy = JSON.parse(JSON.stringify(config));
    //delete some values which are functions
    delete config_copy["aggregators"];
    delete config_copy["renderers"];
    //delete some bulky default values
    delete config_copy["rendererOptions"];
    delete config_copy["localeStrings"];
    this.setState(config);
  }
  resetState = ()=>{
    this.setState(initial_state);
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={this.resetState}>
          Reset table to initial state.
        </button>
        <Pivot
        handleStateChange={this.handleChildChange}
          {...this.state}
        ></Pivot>
      </div>
    );
  }
}

export default App;
