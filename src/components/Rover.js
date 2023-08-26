import React from "react";
import { connect } from "react-redux";
import { Reset } from "../store/actions";
import { startAutoSearch } from "../store/actions";

class Rover extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			
				<>
				<div className="container">
					<button id="searchButton" onClick= {() => {this.props.startAutoSearch()}}>Search</button>
				</div>
				<div className="container">

					<p>
                    	the rover position is {"("+this.props.x_value + ", " +
						 this.props.y_value + ", " + this.props.direction +")"} 
						<br/>
						{this.props.obstacles.length != 0 && <p> Obstacles : {this.props.obstacles?.map((obs)=>"["+obs+"]")}</p>}	
					</p>
				</div>
				<div className="container">
					{
						!this.props.safe.valid && 
							<>
								<h3 style={{"color":"red"}}>Rover Has Stopped</h3>
								<p>{this.props.safe.report}</p>
							</>
					}
					{
						this.props.goal.reached && 
							<>
								<h3 style={{"color":"Green"}}>Rover Reached Goal</h3>
								<p>Goal {" ["+this.props.goal.coord+"]"}</p>
							</>
					}
				</div>
				{/* <button onClick={()=>this.props.reset()}>Reset</button> */}
				</>
			
		);
	}
}

const mapStateToProps = (state) => {
	return {
		x_value: state.x_value,
		y_value: state.y_value,
		direction: state.direction,
		obstacles: state.obstacles,
		safe: state.safe,
		goal: state.goal
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		reset: () => dispatch(Reset()),
		startAutoSearch: () => dispatch(startAutoSearch())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Rover);
