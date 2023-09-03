import { actionType } from "./actions";

class Rover {
    constructor() {
        this.reset()
    }
    reset = function(){
        // this.obstacles = [[4,6],[4,5],[4,4],[5,4],[5,6],[6,4],[6,6]];
        // this.obstacles = [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[9,4]];
        
        this.obstacles = [];
        this.location = {
            x: 0,
            y: 0,
            direction: "NORTH"
        };

        this.commands = {
            "NORTH": [0, 1],
            "EAST": [1, 0],
            "SOUTH": [0, -1],
            "WEST": [-1, 0]
        };
        
        this.path = [];
        
        this.goal = {
            coord: [],
            reached: false
        };
        
        this.nextStep = {
            safe: true,
        };
        this.stuck = false;
        this.hueristic =[...Array(10).keys()].map(i=>{
            return [...Array(10).keys()].map(j=>{
                return 100
            })
        })
    }

    getObstacles(){
        return this.obstacles
    }
        
    f = function () {
        let point = this.commands[this.location.direction];
        let x = this.location.x
        let y = this.location.y

        x += point[0];
        y += point[1];

        this.updateRover(x,y)
        
    };

    b = function () {
        let point = this.commands[this.location.direction];
        let x = this.location.x
        let y = this.location.y

        x += (point[0] * -1);
        y += (point[1] * -1);

        this.updateRover(x,y)
    };

    l = function () {
        let index = directions.indexOf(this.location.direction);
        this.location.direction = directions[(index + 3) % 4];
    };

    r = function () {
        let index = directions.indexOf(this.location.direction);
        this.location.direction = directions[(index + 1) % 4];
    };
    
    saveToPath = function(){
        this.path.push([this.location.x, this.location.y])
    }

    updateRover = function(x,y){
        let safe = !checkItemInArray(this.obstacles, [x, y]);
        let reachedGoal = (x == this.goal.coord[0] && y == this.goal.coord[1]);
        if (safe && !reachedGoal) {
            this.location.x = getRealValue(x);
            this.location.y = getRealValue(y);
        }
        safe ? this.nextStep.safe = true : this.nextStep.safe = false
        reachedGoal ? this.goal.reached = true : this.goal.reached = false
    }

    addObstacle = function(x,y){
        let exists = checkItemInArray(this.obstacles, [x, y]);
        if (!exists && !(x==this.location.x && y==this.location.y) && !(x == this.goal.coord[0] && y == this.goal.coord[1])){
            x = getRealValue(x);
            y = getRealValue(y);
            this.obstacles.push([x,y]);
            
        }
    }

    addGoal = function(x,y){
        let exists = checkItemInArray(this.obstacles, [x, y]);
        if (!exists && (x!=this.location.x || y!=this.location.y)){
            x = getRealValue(x);
            y = getRealValue(y);
            this.goal.coord = [x,y];
            this.calculateHueristics()
        }
    }
    
    resetObstacles = function(){
        this.obstacles = [];
        this.nextStep.safe = true
    }

    resetGoal = function(){
        this.goal.coord = [];
        this.goal.reached = false
    }

    copyRover = function(){
        let copyRover = new Rover();
        copyRover.location = this.location;
        copyRover.obstacles = this.obstacles;
        copyRover.nextStep = this.nextStep;
        copyRover.goal = this.goal;
        copyRover.stuck = this.stuck;
        copyRover.path = this.path;
        return copyRover
    }

    calculateHueristics = function (){
        let x = 0
        let y = 0
        let hueVaule
        let safe
        while(x!=10){
            while(y!=10){
                hueVaule = Math.abs(this.goal.coord[0]-x) + Math.abs(this.goal.coord[1]-y)
                safe = !checkItemInArray(this.obstacles, [x, y]);
                safe ? this.hueristic[x][y] = hueVaule : this.hueristic[x][y] = 100
                y++
            }
            y = 0
            x++
        }
    }

    autoSearch = function(){

        if (this.goal.coord.length == 0){
            return
        }
        if (this.stuck){
            return
        }
        this.calculateHueristics()
        let x = this.location.x
        let y = this.location.y
        this.saveToPath()
        let nextDirection = [
            [x,getRealValue(y+1)],      // Top
            [getRealValue(x+1),y],      // Right
            [x,getRealValue(y-1)],      // Bottom
            [getRealValue(x-1),y]       // Left
        ]
        let index 
        let counter
        let min
        let checkPointDuplicated 
        

        while (min !=0){
            index = 0
            counter = 0
            
            min = this.hueristic[nextDirection[counter][0]][nextDirection[counter][1]]
            counter++
            while (counter < 4){
                checkPointDuplicated = checkItemInArray(this.path, nextDirection[counter])
                if (min > this.hueristic[nextDirection[counter][0]][nextDirection[counter][1]] && !checkPointDuplicated){
                    index = counter
                    min = this.hueristic[nextDirection[counter][0]][nextDirection[counter][1]]
                }
                counter++
            }
            if (min == 100){
                this.stuck = true
                break
            }
            
            x = nextDirection[index][0]
            y = nextDirection[index][1]
            nextDirection = [
                [x,getRealValue(y+1)],      // Top
                [getRealValue(x+1),y],      // Right
                [x,getRealValue(y-1)],      // Bottom
                [getRealValue(x-1),y]       // Left
            ]
            this.updateRover(x,y)
            this.saveToPath()
        }
        if(this.stuck){
           return
        }
        this.goal.reached = true
        this.updateRover(x,y)
        this.location.direction = directions[index]
    }
        
}

const initialState = {
    rover:new Rover(),
    location:{
        x: 0,
        y: 0,
        direction: "NORTH"
    },
    path:[],
    obstacles : [],
    safe: true,
    goal : {
        coord: [],
        reached: false
    },
    stuck:false

}

const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

function getRealValue(axis) {
	while (axis < 0) axis += 10;
	axis %= 10;
	return axis;
}

function checkItemInArray(arr, item) {
	if (arr.some((i) => i[0] == item[0] && i[1] == item[1])) {
		return true;
	} else {
		return false;
	}
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
		case actionType.submitData: {
            state.rover[action.payload]()
            return {
                ...state,
                location : {...state.rover.location},
                stuck:state.rover.stuck,
                safe:state.rover.nextStep.safe,
                goal:{...state.rover.goal}
            }
        }
        case actionType.addObstacle: {
            state.rover.addObstacle(action.payload[0],action.payload[1])
            return {
                ...state,obstacles:[...state.rover.obstacles]
            }
        }
        case actionType.addGoal: {
            state.rover.addGoal(action.payload[0],action.payload[1])
            return {
                ...state,goal:{...state.rover.goal}
            }
        }
        case actionType.reset: {
            state.rover.reset()
            return {
                ...initialState
            }
        }
        case actionType.startAutoSearch: {
            state.rover.autoSearch()
            return {
                ...state,
                location:{...state.rover.location},
                path:[...state.rover.path],
                stuck:state.rover.stuck,
                goal:{...state.rover.goal}
            }
        }

        default: {
            return {
                ...state
            }
        }

    }
}

export const roverReducer = new Rover();