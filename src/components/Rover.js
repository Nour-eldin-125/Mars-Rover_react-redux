import React from "react";
import { connect } from "react-redux";

class Rover extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidUpdate(prevProps) {
		if (prevProps != this.props) {
			console.log(this.props.x_value);
		}
	}
	render() {
		console.log(this.props)
		return (
			<div>
                <p>
                    the rover X position is {this.props.x_value + " "} 
                    and Y position is {this.props.y_value} 
                    <br/> The Direction is  {this.props.direction}</p>
					<p>Obstacles : {this.props.obstacles?.map((obs)=>"["+obs+"]")}</p>
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
	}
}

export default connect(mapStateToProps, null)(Rover);
