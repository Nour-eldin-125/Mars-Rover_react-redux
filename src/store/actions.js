export const actionType = {
    submitData: "SUBMITDATA",
    addObstacle: "ADDOBSTACLE",
    reset: "RESET",
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
export function Reset(){
    return {
        type : actionType.reset, 
    }
}
