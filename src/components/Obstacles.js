import React from "react";

class Obstacles extends React.Component {
    
    render() {
        return (
            <>
                <h3>Obstacles</h3>
                <label>X value : </label>
                <input type="text"  id="inp_obstacle_x"/>
                <label> Y value : </label>
                <input type="text"  id="inp_obstacle_y"/>
                <button onClick= {() => {this.checkData()}}>Submit</button>
            </>
        )
    }
}

export default Obstacles;