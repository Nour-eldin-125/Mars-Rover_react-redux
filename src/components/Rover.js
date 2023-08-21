import React from "react";

class Rover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			x_value: 0,
			y_vlaue: 0,
			direction: "NORTH",
		};
	}
	
    componentDidUpdate(prevProps) {
		if (prevProps != this.props) {
			this.setState({
				x_value: this.props.x_value,
				y_vlaue: this.props.y_value,
				direction: this.props.direction,
			});
		}
	}

	render() {
		return (
			<div>
                <p>
                    the rover X position is {this.state.x_value + " "} 
                    and Y position is {this.state.y_vlaue} 
                    <br/> The Direction is  {this.state.direction}</p>
			</div>
		);
	}
}

export default Rover;
