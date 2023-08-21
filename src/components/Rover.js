import React from "react";
import { connect } from "react-redux";

class Rover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			x_value: 0,
			y_value: 0,
			direction: "NORTH",
		};
	}
	
	componentDidUpdate(prevProps) {
		if (prevProps != this.props) {
			this.setState({
				x_value: this.props.x_value,
				y_value: this.props.y_value,
				direction: this.props.direction,
			});
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		x_value: state.x_value,
		y_value: state.y_value,
		direction: state.direction,
	}
}

export default connect(mapStateToProps, null)(Rover);
