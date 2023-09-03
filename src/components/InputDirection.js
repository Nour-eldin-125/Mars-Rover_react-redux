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

        let obs = inp.value.split(",")
        if(this.props.obstacles.some(obstacle => obstacle[0] == obs[0] && obstacle[1] == obs[1])){
            alert("obstacle already exists");
            return
        }
        if (this.props.x_value == obs[0] && this.props.y_value == obs[1]) {
            alert("Cannot add goal on the Rover");
            return
        }
        // console.log("INput : ", inp.value.split(","));
        this.props.addGoal(inp.value.split(","));
    }
    

    render() {
        return (
                <>
                    <p>Commands</p>
                    <input type="text"  id="inp"/>
                    <button className = "add command" onClick= {() => {this.checkData()}}>Add</button>
                    <p>Goal</p>
                    <input type="text"  id="goalSearch"/>
                    <button placeholder="eg. 1,1 " className = "add goal" onClick= {() => {this.createGoal()}}>Add</button>
                </>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        obstacles: state.obstacles,
        location: state.location,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        submitData: (payload) => dispatch(Submit(payload)),
        addGoal: (payload) => dispatch(addGoal(payload)),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(InputDirection);