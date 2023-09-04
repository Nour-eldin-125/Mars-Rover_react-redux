import React from "react";
import { connect } from "react-redux";
import { Submit , addGoal, startAutoSearch } from "../store/actions";

class InputDirection extends React.Component {
    constructor(props) {
        super(props);
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
                    <p>Commands</p>
                    <input type="text"  id="inp"/>
                    <button className = "add command"
                    onKeyDown={(e) => {e.key === "Enter" && this.checkData()}} 
                    onClick= {() => {this.checkData()}}>Add</button>
                </>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        obstacles: state.obstacles,
        location: state.location,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        submitData: (payload) => dispatch(Submit(payload)),
        addGoal: (payload) => dispatch(addGoal(payload)),
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(InputDirection);