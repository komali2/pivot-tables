import React, { Component } from 'react';
import './App.css';
import Pivot from './Pivot';
import traffic_bytes from './traffic_bytes';


const initial_state = {
  cols: ["source_ip"],
  rows: ["destination_ip"],
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
  handleChildChange = (config) => {
    var config_copy = JSON.parse(JSON.stringify(config));
    //delete some values which are functions
    delete config_copy["aggregators"];
    delete config_copy["renderers"];
    //delete some bulky default values
    delete config_copy["rendererOptions"];
    delete config_copy["localeStrings"];
    this.setState(config);
  }
  setIPDestination = (ip) => {
    let valueFilter = this.setNewValueFilter(ip, 'destination_ip');
    let new_state = this.state;

    // Unfortunately neecessary to clear out the stubbornly sticky PivotTable state
    new_state.valueFilter = undefined;
    this.setState(new_state);

    // Now set actual new state
    new_state.valueFilter = valueFilter;
    this.setState(new_state)
  }
  setIPSource = (ip) => {
    let valueFilter = this.setNewValueFilter(ip, 'source_ip');
    let new_state = this.state;

    // Unfortunately neecessary to clear out the stubbornly sticky PivotTable state
    new_state.valueFilter = undefined;
    this.setState(new_state);

    new_state.valueFilter = valueFilter;
    this.setState(new_state)
  }
  setNewValueFilter = (ip, type) => {
    const out = {};
    out[type] = {};
    traffic_bytes.forEach((data)=>{
      if (data[type] !== ip){
        out[type][data[type]] = true;
      }
    });
    return out;
  }
  resetState = () => {
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
          setIPDestination={this.setIPDestination}
          setIPSource={this.setIPSource}
        ></Pivot>
      </div>
    );
  }
}

export default App;
