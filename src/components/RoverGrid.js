 import React from "react";
 import { connect } from "react-redux";

 class RoverGrid extends React.Component {
 	constructor(props) {
        super(props);

        this.state={
            obstacles:[],
            goal:[],
            path:[]
        }

        this.roverLastLocation = null
        this.goalLastLocation = null
        this.roverImgfromdirection={
            "NORTH":"rover_top.png",
            "EAST":"rover_right.png",
            "SOUTH":"rover_bot.png",
            "WEST":"rover_left.png",
            "OBSTACLE":"obstacle.png",
            "GOAL": "goal.png",
            "AUTOSEARCH": "rover_ghost.png"
        }
 	}
     componentDidMount() {
         this.createRoverImg(this.props.x_value,this.props.y_value,"Rover")
         this.setState({
            obstacles:this.props.obstacles,
            goal:this.props.goal,
            path:this.props.path
        })
        }

    componentDidUpdate(prevProps) {
        if (prevProps != this.props){
             if (this.props.reset){
                this.state.obstacles.map(obs => {
                    this.removeImage((obs[0]),(obs[1]))
                })
                this.state.path.map(path => {
                    this.removeImage(path[0],path[1])
                })
                this.removeImage(this.state.goal[0],this.state.goal[1])
            }
            this.createRoverImg(this.props.x_value,this.props.y_value,"Rover")
            this.props.obstacles.map(obs => this.createRoverImg(obs[0],obs[1],"Obstacle"))
            if (this.props.goal!=[])
                this.createRoverImg(this.props.goal.coord[0],this.props.goal.coord[1],"Goal")
            if(this.props.autoSearch){
                this.props.path.map(path => {
                    this.createRoverImg(path[0],path[1],"AUTOSEARCH")
                })
            }
           
            this.setState({
                obstacles:this.props.obstacles,
                goal:this.props.goal,
                path:this.props.path
            })
        }
    }
    removeImage(x,y){
        let number = this.getNumberOfRovers(x,y);
        document.getElementById("img_"+number)?.setAttribute("src","")    
    }
    createRoverImg(x,y,img){
        let number = this.getNumberOfRovers(x,y);
        let rover = document.getElementById("img_"+number);
        
        if(img == "Rover"){
            document.getElementById("img_"+this.roverLastLocation)?.setAttribute("src","")
            rover.setAttribute("src", this.roverImgfromdirection[this.props.direction])
            this.roverLastLocation = number
        }else if (img == "Obstacle"){
            rover.setAttribute("src", this.roverImgfromdirection.OBSTACLE)
        }else if (img == "AUTOSEARCH"){
            rover.setAttribute("src", this.roverImgfromdirection.AUTOSEARCH)
        }
        else{
            document.getElementById("img_"+this.goalLastLocation)?.setAttribute("src","")
            rover?.setAttribute("src", this.roverImgfromdirection.GOAL)
            this.goalLastLocation = number
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
        goal: state.goal,
        path: state.path,
        autoSearch: state.autoSearch,
        reset: state.reset
    }
}

export default connect(mapStateToProps, null)(RoverGrid);