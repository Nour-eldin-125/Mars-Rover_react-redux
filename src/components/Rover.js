import React from "react";
import { connect } from "react-redux";
import { Reset } from "../store/actions";

class Rover extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<>
					<p>
                    	the rover position is {"("+this.props.x_value + ", " +
						 this.props.y_value + ", " + this.props.direction +")"} 
						<br/>
						Obstacles : {this.props.obstacles?.map((obs)=>"["+obs+"]")}</p>
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
				</>
				<button onClick={()=>this.props.reset()}>Reset</button>
			</div>
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
		reset: () => dispatch(Reset())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Rover);
