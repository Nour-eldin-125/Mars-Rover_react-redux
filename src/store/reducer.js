import { actionType } from "./actions";

const initialState = {
	x_value: 0,
	y_value: 0,
	direction: "NORTH",
    obstacles: [],
    safe: {
        valid: true,
        report:""
    },
    goal:{
        coord:[],
        reached:false,
    },
    path:[[0,0]]
};
const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

const roverDirections = {
	f: 1,
	b: -1,
	l: directions[3],
	r: directions[1],
	d: "y",
};
function calculateNextStep(state,action){
    let change_direction_flag = String(roverDirections[action.payload]).match("^[0-9 -]+$")? true: false;
    if (change_direction_flag) {
        let stepValue = roverDirections[action.payload];
        // Negative Axis
        if (state.direction === "SOUTH" || state.direction === "WEST") {
            stepValue *= -1;
        }
        if (roverDirections.d === "x") {
            let x_val = stepValue + (state.x_value?state.x_value:0);
            return {
                ...state,
                x_value: x_val,
            };
        } else {
            let y_val = stepValue + (state.y_value?state.y_value:0);

            return {
                ...state,
                y_value: y_val,
            };
        }
    } else {
        let dir = roverDirections[action.payload];
        let dir_index = directions.indexOf(dir);
        roverDirections.r = directions[(dir_index + 1) % 4];
        roverDirections.l = directions[(dir_index + 3) % 4];
        roverDirections.d = dir_index % 2 != 0 ? "x" : "y";

        return {
            ...state,
            direction: dir,
        };
    }
}

function checkSafe(state,x,y){
    if(checkItemInArray(state.obstacles,[x,y])){
        return false;
    }
    else if (state.safe.valid)
        return true;
    else 
        return false
}

function checkItemInArray (arr, item) {
    if (arr.some(i => i[0] == item[0] && i[1] == item[1])){
        return true
    }
    else{
        return false
    }
}

function reachedGoal(state){
    if (state.goal.coord[0]== state.x_value && state.goal.coord[1] == state.y_value){
        return true
    }
    else{
        return false
    }
}


export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionType.submitData: {
            let newState = calculateNextStep(state,action);
            if(checkSafe(newState,newState.x_value,newState.y_value)){
                if(reachedGoal(newState)){
                    return {...state, goal: {...state.goal,reached:true}};
                }
                let point = [newState.x_value,newState.y_value];
                if (!checkItemInArray(state.path,point)){
                    return {...newState,path:[...state.path,point]};
                }
                return {...newState};
            }
			return {...state, safe: {...newState.safe, valid: false, report: "Obstacle in the location: ["+ newState.x_value+","+newState.y_value+"]"}};
		}
        case actionType.addObstacle: {
            return {...state, obstacles: [...state.obstacles, action.payload]};
        }
        case actionType.reset: {
            return {...initialState};
        }
        case actionType.addGoal: {
            return {...state, goal: {...state.goal,coord : action.payload,reached:reachedGoal(state)}};
        }
        case actionType.startAutoSearch: {
			return {...state};
        }
		default: {
			return {...state};
		}
	}
}
