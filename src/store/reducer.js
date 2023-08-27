import { actionType } from "./actions";

const initialState = {
	x_value: 0,
	y_value: 0,
	direction: "NORTH",
	// obstacles: [[2,0],[2,1],[2,2],[2,3],[2,4]],
	// obstacles: [[2,2],[2,3],[2,4],[3,2],[4,2],[4,4],[3,4]],
	obstacles: [...Array(8).keys()].map((i) => {return [i, 3]}),
	// obstacles: [],
	safe: {
		valid: true,
		report: "",
	},
	goal: {
		// coord: [3,2],
		// coord: [3,3],
		coord: [],
		reached: false,
	},
	path: [],
	reset: false,
	autoSearch: false,
	stuck: false,
};
const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

const roverDirections = {
	f: 1,
	b: -1,
	l: directions[3],
	r: directions[1],
	d: "y",
};
function calculateNextStep(state, action) {
	let change_direction_flag = String(roverDirections[action.payload]).match(
		"^[0-9 -]+$"
	)
		? true
		: false;
	if (change_direction_flag) {
		let stepValue = roverDirections[action.payload];
		// Negative Axis
		if (state.direction === "SOUTH" || state.direction === "WEST") {
			stepValue *= -1;
		}
		if (roverDirections.d === "x") {
			let x_val = stepValue + (state.x_value ? state.x_value : 0);
			return {
				...state,
				x_value: x_val,
			};
		} else {
			let y_val = stepValue + (state.y_value ? state.y_value : 0);

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

function checkSafe(state, x, y) {
	if (checkItemInArray(state.obstacles, [getRealValue(x), getRealValue(y)])) {
		return false;
	} else if (state.safe.valid) return true;
	else return false;
}

function checkItemInArray(arr, item) {
	if (arr.some((i) => i[0] == item[0] && i[1] == item[1])) {
		return true;
	} else {
		return false;
	}
}

function reachedGoal(state) {
	if (
		state.goal.coord[0] == getRealValue(state.x_value) &&
		state.goal.coord[1] == getRealValue(state.y_value)
	) {
		return true;
	} else {
		return false;
	}
}

/*
steps to proceed in the direction for the goal : 
1. Calculate the shortest distance between the goal and the rover
2. choose the path to reach the goal
3. check if there is a obstacle ahead if exits get another root to the goal 
4. repeat steps from 1 to 3 till the rover reaches the goal each time the rover steps
5. return the path the rover chose draw the path for the rover
*/
// calculate the real value of the axis from 0 to 9 :
function getRealValue(axis) {
	while (axis < 0) axis += 10;
	axis %= 10;
	return axis;
}

// calculate the diffrence between the goal and the axis
function distanceDiffernece(axis, goal) {
	return goal - axis;
}

// check which axis have larger distance to cover with no obstacles
function maxDistanceCovered(axisValue, axisGoal, z, axisIdentifier, state) {
	let distance;
	let maxDistance = 0;
	while (axisValue != axisGoal) {
		distance = distanceDiffernece(axisValue, axisGoal);
		if (distance < 0) {
			axisValue--;
			maxDistance--;
		} else {
			axisValue++;
			maxDistance++;
		}
		if (axisIdentifier == "x") {
			if (checkSafe(state, axisValue, z)) {
				continue;
			} else {
				maxDistance < 0 ? maxDistance++ : maxDistance--;
				break;
			}
		} else {
			if (checkSafe(state, z, axisValue)) {
				continue;
			} else {
				maxDistance < 0 ? maxDistance++ : maxDistance--;
				break;
			}
		}
	}
	return maxDistance;
}

/**
 * Calculates the weight of alternative pathes.
 *
 * @param {number} axisValue - the X coordinate
 * @param {number} z - the Y coordinate
 * @param {number[]} goal - the goal coordinate
 * @param {string} state - the state value
 * @param {string} axisIdentifier - the axis identifier
 * @param {number} direction - the direction value
 * @return {number} the weight of alternative pathes
 */
function weightAlternativePathes(
	axisValue,
	goal,
	z,
	axisIdentifier,
	state,
	direction
) {
	let axis = axisValue;
	let constantAxis = z;
	let axisGoal;
	let statusStuck = false;
	if (axisIdentifier == "x") {
		axisGoal = goal[1];
		axisIdentifier = "y";
	} else {
		axisIdentifier = "x";
		axisGoal = goal[0];
	}
	let pathDirection = axis;
	let directionCounter = 0;

	let maxDis = 0;

	while (maxDis == 0) {
		pathDirection += 1 * direction;
		directionCounter++;
		pathDirection = getRealValue(pathDirection);
		maxDis = maxDistanceCovered(
			constantAxis,
			axisGoal,
			pathDirection,
			axisIdentifier,
			state
		);
		if (directionCounter == 11) {
			statusStuck = true;
			directionCounter = 0
			break;
		}
	}
	return [directionCounter,statusStuck];
}

function getAlternativePath(state, x, y, goal) {
	let xdiff = distanceDiffernece(x, goal[0]);
	// let ydiff = distanceDiffernece(y, goal[1]);
	// vertical Line
	if (xdiff == 0) {
		let left = weightAlternativePathes(x, goal, y, "x", state, -1);
		let right = weightAlternativePathes(x, goal, y, "x", state, 1);
		
		if (left[1] && right[1]) {return [0, 0]};
		if (left [1]){
			return [1, right[0]];
		}
		else if (right[1]){
			return [-1, left[0]];
		}
		if (left[0] == right[0]){
			return [1, right[0]];
		}
		if (left[0] < right[0]) {
			return [-1, left[0]];
		} else {
			return [1, right[0]];
		}
	}
	// horizontal Line
	else {
		let bot = weightAlternativePathes(y, goal, x, "y", state, -1);
		let top = weightAlternativePathes(y, goal, x, "y", state, 1);
		
		if (bot[1] && top[1]) {return [0, 0]};
		if (bot[1]){
			return [1, top[0]];
		}
		else if (top[1]){
			return [-1, bot[0]];
		}
		if (bot[0] == top[0]){
			return [1, top[0]];
		}
		if (bot[0] < top[0]) {
			return [-1, bot[0]];
		} else {
			return [1, top[0]];
		}
	}
}

function checkCoveredPointInPath(point, path) {
	if (path.some((i) => i[0] == point[0] && i[1] == point[1])) {
		return true;
	} else {
		return false;
	}
}

// 2. choose the path to reach the goal
function pathToGoal(state, goal) {
	let x = getRealValue(state.x_value);
	let y = getRealValue(state.y_value);
	goal = [getRealValue(goal[0]), getRealValue(goal[1])];
	let maxDXcheckPoint
	let maxDYcheckPoint

	while (x != goal[0] || y != goal[1]) {
		let maxDX = maxDistanceCovered(x, goal[0], y, "x", state);
		let maxDY = maxDistanceCovered(y, goal[1], x, "y", state);
		let directionsOffset;
		

		
		// if (maxDX==0){	
		// 	let xPath = checkPath
		// 	maxDXcheckPoint = checkCoveredPointInPath([getRealValue(x + maxDX), y], checkPath);
		// }
		// if (maxDY==0){
		// 	let yPath = checkPath
		// 	yPath.pop()
		// 	maxDYcheckPoint = checkCoveredPointInPath([x,getRealValue(y+maxDY)], yPath);
		// }
		// else {
		
		// }
		// True for y 
		// false for x
		let maxDis

		if (maxDXcheckPoint && maxDYcheckPoint){
			return [state , "Stuck"];
		}
		else if (maxDXcheckPoint && Math.abs(maxDX) > Math.abs(maxDY)){
			maxDis = true
		}
		else if (maxDYcheckPoint && Math.abs(maxDY) > Math.abs(maxDX)){
			maxDis = false
		}
		else if (Math.abs(maxDX) == Math.abs(maxDY) && Math.abs(maxDX)!=0){
			let checkXdirection = checkCoveredPointInPath([getRealValue(x + maxDX), y], state.path);
			let checkYdirection = checkCoveredPointInPath([x,getRealValue(y + maxDY)], state.path);
			if (checkXdirection){
				if(checkYdirection){
					return [state , "Stuck"];
				}
				else{
					maxDis = true
				}
			}
			else {
				maxDis = false
			}
		}
		else {
			Math.abs(maxDX) > Math.abs(maxDY) ? (maxDis = false) : (maxDis = true);
		}
		if (!maxDis) {
			maxDX < 0 ? (directionsOffset = -1) : (directionsOffset = 1);
			
			maxDXcheckPoint = checkCoveredPointInPath([getRealValue(x + maxDX), y], state.path);
			maxDYcheckPoint = false;
			
			[...Array(Math.abs(maxDX)).keys()].map((i) => {
				state.path.push([getRealValue(x + (i + 1) * directionsOffset), y]);
			});
			x = x + maxDX;
			x = getRealValue(x);
			state.x_value = x;
		} else if (x == goal[0] && maxDY == 0) {

			let altPath = getAlternativePath(state, x, y, goal);

			if (altPath[1] == 0 && altPath[0] == 0) {return [state , "Stuck"];}
			
			let directionToPath = altPath[0];
			maxDX = altPath[1];

			maxDXcheckPoint = checkCoveredPointInPath([getRealValue(x + maxDX), y], state.path);
			maxDYcheckPoint = false

			maxDX *= directionToPath;
			[...Array(Math.abs(maxDX)).keys()].map((i) => {
				state.path.push([getRealValue(x + (i + 1) * directionToPath), y]);
			});
			x = x + maxDX;
			x = getRealValue(x);
			state.x_value = x;

		} else if (y == goal[1] && maxDX == 0) {
			
			let altPath = getAlternativePath(state, x, y, goal);

			maxDYcheckPoint = checkCoveredPointInPath([x,getRealValue(y + maxDY)], state.path);
			maxDXcheckPoint = false

			if (altPath[1] == 0 && altPath[0] == 0) {return [state , "Stuck"];}

			let directionToPath = altPath[0];
			maxDY = altPath[1];
			maxDY *= directionToPath;
			[...Array(Math.abs(maxDY)).keys()].map((i) => {
				state.path.push([x, getRealValue(y + (i + 1) * directionToPath)]);
			});
			y = y + maxDY;
			y = getRealValue(y);
			state.y_value = y;
		} else if (maxDXcheckPoint && maxDYcheckPoint) {
			return [state , "Stuck"];
		}
		else {
			maxDY < 0 ? (directionsOffset = -1) : (directionsOffset = 1);

			maxDYcheckPoint = checkCoveredPointInPath([x,getRealValue(y + maxDY)], state.path);
			maxDXcheckPoint = false;


			[...Array(Math.abs(maxDY)).keys()].map((i) => {
				state.path.push([x, getRealValue(y + (i + 1) * directionsOffset)]);
			});
			y = y + maxDY;
			y = getRealValue(y);
			state.y_value = y;
		}

	}
	return [state, "Success"];
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionType.submitData: {
			let newState = calculateNextStep(state, action);
			if (checkSafe(newState, newState.x_value, newState.y_value)) {
				if (reachedGoal(newState)) {
					return { ...state, goal: { ...state.goal, reached: true ,reset:false } };
				}
				return { ...newState,reset:false };
			}
			return {
				...state,
                reset:false,
				safe: {
					...newState.safe,
					valid: false,
					report:
						"Obstacle in the location: [" +
						getRealValue(newState.x_value) +
						"," +
						getRealValue(newState.y_value) +
						"]",
				},
			};
		}
		case actionType.addObstacle: {
			return { ...state, obstacles: [...state.obstacles, action.payload], reset:false};
		}
		case actionType.reset: {
			return { ...initialState,reset:true };
		}
		case actionType.addGoal: {
			return {
				...state,
				goal: {
					...state.goal,
					coord: action.payload,
					reached: reachedGoal(state),
				},
                reset:false
			};
		}
		case actionType.startAutoSearch: {
			if (state.goal.coord.length!=0 && !state.stuck) {
				let x = getRealValue(state.x_value)
				let y = getRealValue(state.y_value)
				let [newState , status] = pathToGoal(state, state.goal.coord);
				if (status === "Stuck")
					{
						newState.path.pop();
						let point = newState.path.pop();
						return { ...newState, x_value: point[0], y_value: point[1], stuck: true ,autoSearch: true,path: [[x,y],...newState.path],};
					}
				
					newState.path.pop();
					let point = newState.path.pop();
				return {
					...newState,
					autoSearch: true,
					x_value: point[0],
					y_value: point[1],
                    direction: "EAST",
					path: [[x,y],...newState.path],
                    reset:false,
					goal:{...newState.goal,reached: true},
					stuck:false
				};
			}
			return { ...state,reset:false};
		}
		default: {
			return { ...state };
		}
	}
}
