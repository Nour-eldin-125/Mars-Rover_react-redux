 import React from "react";
 import { connect } from "react-redux";
 import { gridSize, imagesForGrid } from "../constants";

 class RoverGrid extends React.Component {
 	constructor(props) {
        super(props);

        this.gridArray = [...Array(gridSize).keys()].map((i) => {
            return [...Array(gridSize).keys()].map((j) => {
                return (i * gridSize + j);
            });
        });
        this.gridArray = this.gridArray.reverse()

        this.roverLastLocation = null
        this.goalLastLocation = null
        
 	}

     componentDidMount() {
            console.log(this.gridArray)
            this.createRoverImg(this.props.x,this.props.y,"Rover")
    }

    componentDidUpdate(prevProps) {
        
            this.createRoverImg(this.props.x,this.props.y,"Rover")
            this.props.obstacles.map(obs => this.createRoverImg(obs[0],obs[1],"Obstacle"))
            if (this.props.goal!=[])
                this.createRoverImg(this.props.goal.coord[0],this.props.goal.coord[1],"Goal")
            if(this.props.path.length!=0){
                let p = this.props.path
                p.pop()
                p.pop()
                p.map(path => {
                    this.createRoverImg(path[0],path[1],"AUTOSEARCH")
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
            rover.setAttribute("src", imagesForGrid[this.props.direction])
            this.roverLastLocation = number
        }else if (img == "Obstacle"){
            rover.setAttribute("src", imagesForGrid.OBSTACLE)
        }else if (img == "AUTOSEARCH"){
            rover.setAttribute("src", imagesForGrid.AUTOSEARCH)
        }
        else{
            document.getElementById("img_"+this.goalLastLocation)?.setAttribute("src","")
            rover?.setAttribute("src", imagesForGrid.GOAL)
            this.goalLastLocation = number
        }

    }

    getNumberOfRovers(x,y){
        while (x<0)
            x+=gridSize
        while (y<0)
            y+=gridSize
        x %= gridSize
        y %= gridSize
        return y*gridSize+x
    }

    

 	render() {
 		return (
 			<>
 				<div className="grid-container" style = {
                {"grid-template-columns" : `repeat(${gridSize}, 1fr)`,
                "grid-template-rows": `repeat(${gridSize}, 1fr)`}
                }>
                    {
                        this.gridArray.map((arr)=>{
                            return arr.map((i)=>{
                                return <div className="grid-item" 
                                        id = {""+i} 
                                        key={""+i}>
                                    <img id = {"img_"+i}/>
                                </div>        
                            })
                        })
                    }

                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // location: state.location,
        x: state.location.x,
        y: state.location.y,
        direction: state.location.direction,
        // obstacles: state.rover.getObstacles(),
        goal: state.goal,
        path: state.path,
        autoSearch: state.autoSearch,
        obstacles: state.obstacles,
        // safe: state.safe,
        // goal: state.goal,
        // path: state.path,
        // autoSearch: state.autoSearch,
        // reset: state.reset
    }
}

export default connect(mapStateToProps, null)(RoverGrid);