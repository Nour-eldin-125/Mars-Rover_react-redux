import React from "react";
import { connect } from "react-redux";
import { addObstacle } from "../store/actions";


class Obstacles extends React.Component {
    
    
    addObs() {
        let inp = document.getElementById("inp_obstacle");
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
        this.props.addObstacle(obs);
    }

    render() {
        return (
            <>
                <p>Obstacles</p>
                <input type="text"  id="inp_obstacle"/>                
                <button className = "add obstacle" onClick= {() => {this.addObs()}}>ADD</button>
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