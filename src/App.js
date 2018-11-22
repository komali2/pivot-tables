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
  valueFilter: {
    destination_ip: {},
    source_ip: {},
  },
  data: traffic_bytes,
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = JSON.parse(JSON.stringify(initial_state));

  }
  componentDidMount = () => {
    this.parseUrl();
    window.onpopstate = ()=>{
      this.parseUrl(true);
    };
  }
  parseUrl = (skip)=>{
    // Doesn't work in internet explorer
    const params = new URLSearchParams(document.location.search.substring(1));
    const source_filter = params.get('source_filter');
    const destination_filter = params.get('destination_filter');
    if(source_filter){
      this.setIPSource(source_filter, skip);
    } else if (destination_filter) {
      this.setIPDestination(destination_filter, skip);
    } else {
      this.resetState(null, skip);
    }
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
  setIPDestination = (ip, skip) => {
    const valueFilter = this.setNewValueFilter(ip, 'destination_ip');
    const new_state = this.state;

    // Unfortunately neecessary to clear out the stubbornly sticky PivotTable state
    new_state.valueFilter = undefined;
    this.setState(new_state);

    // Now set actual new state
    if (!skip) window.history.pushState(valueFilter, '', `?destination_filter=${ip}`);
    new_state.valueFilter = valueFilter;
    this.setState(new_state)
  }
  setIPSource = (ip, skip) => {
    const valueFilter = this.setNewValueFilter(ip, 'source_ip');
    const new_state = this.state;

    // Unfortunately neecessary to clear out the stubbornly sticky PivotTable state
    new_state.valueFilter = undefined;
    this.setState(new_state);

    if (!skip) window.history.pushState(valueFilter, '', `?source_filter=${ip}`);
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
  resetState = (e, skip) => {
    // Little trick to ensure the object wasn't passed by reference
    this.setState(JSON.parse(JSON.stringify(initial_state)));
    if (!skip) window.history.pushState({}, '', '/');
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
