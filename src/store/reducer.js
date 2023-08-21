const initialState = {
    x_value: 0,
    y_vlaue: 0,
    direction: "NORTH",    
}
const roverDirections = {
    "f":1,
    "b":-1,
    "l":"w",
    "r":"e",
    "d":'y',
}

export default function reducer (state = initialState, action){
    return state;
}
