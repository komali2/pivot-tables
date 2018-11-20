import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import traffic_bytes from './traffic_bytes';

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

// see documentation for supported input formats
const data = traffic_bytes;



class Pivot extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    handleStateChange = (s)=>{
        this.setState(s)
    }

    render() {
        return (
            <PivotTableUI
                data={data}
                onChange={this.handleStateChange}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                hiddenFromDragDrop={['sum_bytes']}
                {...this.state}
            />
        );
    }
}
export default Pivot;