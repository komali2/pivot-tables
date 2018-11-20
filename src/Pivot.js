import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);


class Pivot extends React.Component {
    handleStateChange = (s)=>{
        this.props.handleStateChange(s);
    }
    handleCellClicked = (e)=>{
        console.log(e.target.innerHTML);
    }
    componentDidMount(){
        const table = document.getElementsByClassName('pvtTable')[0];
        table.addEventListener('click', this.handleCellClicked);
    }
    componentWillUnmount(){
        const table = document.getElementsByClassName('pvtTable')[0];
        table.removeEventListener('click', this.handleCellClicked);
    }
    render() {
        return (
            <PivotTableUI
                onChange={this.handleStateChange}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                hiddenFromDragDrop={['sum_bytes']}
                {...this.props}
            />
        );
    }
}
export default Pivot;