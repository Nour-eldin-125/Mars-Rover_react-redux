import { actionType } from "./actions";

class Rover {
    constructor() {
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

        updateRover = function(x,y){
            let safe = !checkItemInArray(this.obstacles, [x, y]);
            let reachedGoal = (x == this.goal.coord[0] && y == this.goal.coord[1]);
            if (safe && !reachedGoal) {
                this.location.x = getRealValue(x);
                this.location.y = getRealValue(y);
            }
            safe ? this.nextStep.safe = true : this.nextStep.safe = false
            reachedGoal ? this.nextStep.reached = true : this.nextStep.reached = false
        }

        addObstacle = function(x,y){
            let exists = checkItemInArray(this.obstacles, [x, y]);
            if (!exists && !(x==this.location.x && y==this.location.y))
                this.obstacles.push([x,y]);
        }

        addGoal = function(x,y){
            let exists = checkItemInArray(this.obstacles, [x, y]);
            if (!exists && (x!=this.location.x || y!=this.location.y))
                this.goal.coord = [x,y];
        }
}

const initialState = {
    rover:new Rover(),    
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
                ...state
            }
        }
        case actionType.addObstacle: {
            return {
                ...state
            }
        }
        case actionType.addGoal: {
            return {
                ...state
            }
        }
        case actionType.reset: {
            return {
                ...state
            }
        }
        case actionType.startAutoSearch: {
            return {
                ...state
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