import React from "react";
import { connect } from "react-redux";


class InputComponent extends React.Component {
    constructor(props) {
        super(props);
    }

   
    createObject() {
        let inp = document.getElementById(this.props.text);
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
        this.props.onClick(inp.value.split(",")[0],inp.value.split(",")[1]);
    }

    render() {
        return (
            <div className = "container">
                <p>{this.props.text}</p>
                <input type="text"  id={this.props.text} onKeyDown={(e) => {e.key === "Enter" && this.createObject()}}/>
                <button className = "add" onClick= {() => {this.createObject()}}>Add</button>
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

export default connect (mapStateToProps,null)(InputComponent);