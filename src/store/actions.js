export const actionType = {
    submitData: "SUBMITDATA"
}


export function Submit(payload){
    return {
        type : actionType.submitData, 
        payload
    }
}