import React from "react";
import { connect } from "react-redux";


class InputComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    // checkData() {
    //     let inp = document.getElementById("inp");
    //     if (!(inp.value.match("^[FLBRflbr]+$"))) {
    //         alert("Invalid Input");
    //         inp.value = ""
    //         return
    //     }
    //     for (let i in inp.value) {
    //         this.props.submitData(inp.value[i].toLowerCase());
    //     }
    // }

    createObject() {
        let inp = document.getElementById("inp");
        if (!(inp.value.match("^[0-9 -]+,[0-9 -]+$"))) {
            alert("Invalid Input");
            inp.value = ""
            return
        }
        let obj = inp.value.split(",")
        if(this.props.obstacles.some(obstacle => obstacle[0] == obj[0] && obstacle[1] == obj[1])){
            alert(`Cannot add ${obj} on the Obstacle`);
            return
        }
        if (this.props.x == obj[0] && this.props.y == obj[1]) {
            alert(`Cannot add ${obj} on the Rover`);
            return
        }
        // console.log("INput : ", inp.value.split(","));
        this.props.addGoal(inp.value.split(","));
    }

    render() {
        return (
            <div>
                <input type="text"  id="inp"/>
                <button className = "add command" onClick= {() => {this.checkData()}}>Add</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        obstacles: state.obstacles,
        x: state.location.x,
        y: state.location.y
    }
}