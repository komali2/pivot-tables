import React from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

// create Plotly renderers via dependency injection
const PlotlyRenderers = createPlotlyRenderers(Plot);

class Pivot extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected_ip: null,
        };
    }
    handleStateChange = (s)=>{
        this.props.handleStateChange(s);
    }
    handleCellClicked = (e)=>{
        // Only handle clicks on IP addresses in headers 
        if(e.target.classList.contains('pvtColLabel') || e.target.classList.contains('pvtRowLabel')) {
            e.preventDefault();
            this.showContextMenu(e);
            this.setState({selected_ip: e.target.innerHTML})
        } else {
            this.hideContextMenu();
        }
    }
    showContextMenu(e){
        const ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.style.display = "block";
        ctxMenu.style.left = (e.pageX - 10) + "px";
        ctxMenu.style.top = (e.pageY - 10) + "px";
    }
    hideContextMenu(){
        const ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.style.display = "";
        ctxMenu.style.left = "";
        ctxMenu.style.top = "";
    }
    setIPDestination = () => {
        this.hideContextMenu();
        this.props.setIPDestination(this.state.selected_ip);
    }
    setIPSource = () => {
        this.hideContextMenu();
        this.props.setIPSource(this.state.selected_ip);
    }
    componentDidMount = ()=>{
        const table = document.getElementsByClassName('pvtTable')[0];
        table.addEventListener('click', this.handleCellClicked);
    }
    componentWillUnmount(){
        const table = document.getElementsByClassName('pvtTable')[0];
        table.removeEventListener('click', this.handleCellClicked);
    }
    render() {
        return (
            <div>
                <PivotTableUI
                    onChange={this.handleStateChange}
                    renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                    hiddenFromDragDrop={['sum_bytes']}
                    {...this.props}
                    />
                <menu id="ctxMenu">
                    <menu title="See all bytes towards" onClick={this.setIPDestination}>See all bytes towards</menu>
                    <menu title="See all bytes from" onClick={this.setIPSource}>See all bytes from</menu>
                </menu>
            </div>
        );
    }
}
export default Pivot;
