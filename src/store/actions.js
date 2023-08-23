export const actionType = {
    submitData: "SUBMITDATA",
    addObstacle: "ADDOBSTACLE",
    reset: "RESET",
    addGoal: "ADDGOAL",
    startAutoSearch: "STARTAUTOSERACH"
}


export function Submit(payload){
    return {
        type : actionType.submitData, 
        payload
    }
}
export function addObstacle(payload){
    return {
        type : actionType.addObstacle, 
        payload
    }
}

export function addGoal(payload){
    return {
        type : actionType.addGoal, 
        payload
    }
}
export function Reset(){
    return {
        type : actionType.reset, 
    }
}

export function startAutoSearch(){
    return {
        type : actionType.startAutoSearch, 
    }
}
