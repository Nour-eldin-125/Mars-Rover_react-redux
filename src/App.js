import React from 'react';
import './App.css';
import Rover from './components/Rover';
import InputDirection from './components/InputDirection';
import InputComponent from './components/Input.component';
import RoverGrid from './components/RoverGrid';
import { connect } from 'react-redux';
import { addGoal, addObstacle } from "./store/actions";



class App extends React.Component {
  
  addObstacle(x,y){
    this.props.addObstacle([x,y])
  }
  
  addGoal(x,y){
    this.props.addGoal([x,y])
  }
  
  render(){
      return (
      <>
        <h1>Mars Rover</h1>
        <RoverGrid />

            <div className = "container">
              <InputDirection />
              <InputComponent text = "Obstacle" onClick = {(x,y) => {this.addObstacle(x,y)}}/>
              <InputComponent text = "Goal" onClick = {(x,y) => {this.addGoal(x,y)}}/>
            </div>
          <Rover />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
      addObstacle: (payload) => dispatch(addObstacle(payload)),
      addGoal: (payload) => dispatch(addGoal(payload)),
  }
}

export default connect (null, mapDispatchToProps)(App);