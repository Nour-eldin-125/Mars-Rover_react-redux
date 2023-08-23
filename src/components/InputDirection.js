import React from "react";
import { connect } from "react-redux";
import { Submit , addGoal, startAutoSearch } from "../store/actions";

class InputDirection extends React.Component {
    constructor(props) {
        super(props);
    }
    
    checkData() {
        let inp = document.getElementById("inp");
        if (!(inp.value.match("^[FLBRflbr]+$"))) {
            alert("Invalid Input");
            inp.value = ""
            return
        }
        for (let i in inp.value) {
            this.props.submitData(inp.value[i].toLowerCase());
        }
    }
    
    createGoal() {
        let inp = document.getElementById("goalSearch");
        if (!(inp.value.match("^[0-9 -]+,[0-9 -]+$"))) {
            alert("Invalid Input");
            inp.value = ""
            return
        }

        // console.log("INput : ", inp.value.split(","));
        this.props.addGoal(inp.value.split(","));
    }
    
    search() {
        this.props.startAutoSearch()
    }

    render() {
        return (
                <>
                    <h3>Rover Commands</h3>
                    <p>Command Rover to location: </p>
                    <input type="text"  id="inp"/>
                    <button onClick= {() => {this.checkData()}}>Submit</button>
                    <br/>
                    <p>Auto Search for Goal: </p>
                    <input type="text"  id="goalSearch"/>
                    <button placeholder="eg. 1,1 " onClick= {() => {this.createGoal()}}>Search</button>
                    <button onClick= {() => {this.search()}}>GO</button>
                </>
            )
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        submitData: (payload) => dispatch(Submit(payload)),
        addGoal: (payload) => dispatch(addGoal(payload)),
        startAutoSearch: () => dispatch(startAutoSearch())
    }
}

export default connect (null, mapDispatchToProps)(InputDirection);