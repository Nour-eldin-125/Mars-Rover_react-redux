import React from "react";
import { connect } from "react-redux";
import { addObstacle } from "../store/actions";


class Obstacles extends React.Component {
    
    addObs(){
        let x_value = document.getElementById("inp_obstacle_x").value;
        let y_value = document.getElementById("inp_obstacle_y").value;
        let obs = [x_value,y_value];
        if(this.props.obstacles.some(obs => obs[0] == obs[0] && obs[1] == obs[1])){
            alert("obstacle already exists");
            return
        }
        this.props.addObstacle(obs);
    }
    
    render() {
        return (
            <>
                <h3>Obstacles</h3>
                <label>X value : </label>
                <input type="number"  id="inp_obstacle_x"/>
                <label> Y value : </label>
                <input type="number"  id="inp_obstacle_y"/>
                <button onClick= {() => {this.addObs()}}>Submit</button>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        obstacles: state.obstacles,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addObstacle: (payload) => dispatch(addObstacle(payload))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Obstacles);