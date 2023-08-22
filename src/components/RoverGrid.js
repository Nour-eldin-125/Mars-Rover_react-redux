 import React from "react";
 import { connect } from "react-redux";

 class RoverGrid extends React.Component {
 	constructor(props) {
        super(props);
        
        this.num = null
        this.roverImgfromdirection={
            "NORTH":"rover_top.png",
            "EAST":"rover_right.png",
            "SOUTH":"rover_bot.png",
            "WEST":"rover_left.png",
            "OBSTACLE":"obstacle.png",
            "GOAL": "goal.png"
        }
 	}
     componentDidMount() {
         this.createRoverImg(this.props.x_value,this.props.y_value,"Rover")
        }
    componentDidUpdate() {
        this.createRoverImg(this.props.x_value,this.props.y_value,"Rover")
        this.props.obstacles.map(obs => this.createRoverImg(obs[0],obs[1],"Obstacle"))
    }
    
    createRoverImg(x,y,img){
        let number = this.getNumberOfRovers(x,y);
        let rover = document.getElementById("img_"+number);
        
        if(img == "Rover"){
            document.getElementById("img_"+this.num)?.setAttribute("src","")
            rover.setAttribute("src", this.roverImgfromdirection[this.props.direction])
            this.num = number
        }else{
            rover.setAttribute("src", this.roverImgfromdirection.OBSTACLE)
        }

    }

    getNumberOfRovers(x,y){
        while (x<0)
            x+=10
        while (y<0)
            y+=10
        x %= 10
        y %= 10 
        return y*10+x
    }
 	render() {
 		return (
 			<>
 				<div className="grid-container">
                    {
                        [ ...Array(100).reverse().keys() ].map((i)=>{
                            i=99-i
                            let j =0
                            i < 10 ? j=0 : j = parseInt(i / 10)
                            j*=10
                            i = i % 10
                            let id = j+9-i
                            return <div className="grid-item" id = {id} key={j+9-i}>
                                <img id = {"img_"+id}/>
                            </div>
                        })
                    }

                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        x_value: state.x_value,
        y_value: state.y_value,
        direction: state.direction,
        obstacles: state.obstacles,
        safe: state.safe,
    }
}

export default connect(mapStateToProps, null)(RoverGrid);