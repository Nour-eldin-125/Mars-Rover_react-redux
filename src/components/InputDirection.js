import React from "react";
import { connect } from "react-redux";
import { Submit } from "../store/actions";

class InputDirection extends React.Component {
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

    checkData() {
        let inp = document.getElementById("inp");
        if (!(inp.value.match("^[FLBRflbr]+$"))) {
            alert("Invalid Input");
            inp.value = ""
            return
        }
        for (let i in inp.value) {
            this.props.submitData(inp.value[i].toLowerCase());
        }
    }

    render() {
        return (
            <>
                <input type="text"  id="inp"/>
                <button onClick= {() => {this.checkData()}}>Submit</button>
            </>
            )
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        submitData: (payload) => dispatch(Submit(payload))
    }
}

export default connect (null, mapDispatchToProps)(InputDirection);