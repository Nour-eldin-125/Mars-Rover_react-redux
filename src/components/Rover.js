import React from "react";
import { connect } from "react-redux";
import { Reset } from "../store/actions";
import { startAutoSearch } from "../store/actions";

class Rover extends React.Component {
	constructor(props) {
		super(props);
	}
	
	// render() {
	// 	return (
			
	// 			<>
	// 			<div className="container">
	// 				<button id="searchButton" onClick= {() => {this.props.startAutoSearch()}}>Search</button>
	// 			</div>
	// 			<div className="container">

	// 				<p>
    //                 	the rover position is {"("+this.props.x_value + ", " +
	// 					 this.props.y_value + ", " + this.props.direction +")"} 
	// 					{this.props.obstacles.length != 0 && <p> Obstacles : {this.props.obstacles?.map((obs)=>"["+obs+"]")}</p>}	
	// 				</p>
	// 			</div>
	// 			<div className="container">
	// 				{
	// 					!this.props.safe.valid && 
	// 						<>
	// 							<h3 style={{"color":"red"}}>Rover Has Stopped</h3>
	// 							<p>{this.props.safe.report}</p>
	// 						</>
	// 				}
	// 				{
	// 					this.props.goal.reached && 
	// 						<>
	// 							<h3 style={{"color":"Green"}}>Rover Reached Goal</h3>
	// 							<p>{" ["+this.props.goal.coord+"]"}</p>
	// 						</>
	// 				}
	// 				{
	// 					this.props.stuck &&
	// 					<>
	// 							<h3 style={{"color":"red"}}>Rover is Stuck</h3>
	// 					</>
	// 				}
	// 			</div>
	// 			{/* <button onClick={()=>this.props.reset()}>Reset</button> */}
	// 			</>
			
	// 	);
	// }

	render(){
		return (
			<>
				<div className="container">
						<button id="searchButton" 
						onClick= {() => {this.props.startAutoSearch()}}
						>
							Search
						</button>
				</div>
				<div className="container">

				{ !this.props.safe && <h3 className="stuck"> Not Safe there is an obstacle</h3>}
				{ this.props.stuck && <h3 className="stuck"> Rover is Stuck</h3>}
				{ this.props.goal.reached && <h3 className="reached"> Reached the Goal 🥳</h3>}
				</div>

				<div className="container">
 				<p>
                 	the rover position is {"("+this.props.x + ", " +
 					 this.props.y + ", " + this.props.direction +")"} 
 					{/* {this.props.obstacles.length != 0 && <p> Obstacles : {this.props.obstacles?.map((obs)=>"["+obs+"]")}</p>}	 */}
 				</p>
 			</div>

			</>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		// rover: state.rover,
		// location: state.location,
		x: state.location.x,
		y: state.location.y,
		direction: state.location.direction,
		// y: state.rover.location.y,
		// direction: state.rover.location.direction,
		// obstacles: state.obstacles,
		// safe: state.safe,
		goal: state.goal,
		stuck: state.stuck,
		safe: state.safe
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		reset: () => dispatch(Reset()),
		startAutoSearch: () => dispatch(startAutoSearch())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Rover);
