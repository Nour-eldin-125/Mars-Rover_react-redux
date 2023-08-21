export const actionType = {
    submitData: "SUBMITDATA",
    addObstacle: "ADDOBSTACLE",
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

