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
            
            this.location.x = getRealValue(x);
            this.location.y = getRealValue(y);
        };

        b = function () {
            let point = this.commands[this.location.direction];
            let x = this.location.x
            let y = this.location.y

            x += (point[0] * -1);
            y += (point[1] * -1);

            this.location.x = getRealValue(x);
            this.location.y = getRealValue(y);
        };

        l = function () {
            let index = directions.indexOf(this.location.direction);
            this.location.direction = directions[(index + 3) % 4];
        };

        r = function () {
            let index = directions.indexOf(this.location.direction);
            this.location.direction = directions[(index + 1) % 4];
        };

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