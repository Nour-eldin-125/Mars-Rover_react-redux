const reduce = require('../store/reducer');

describe("reducer functions", () => {
    it ("get real value", () => {
        expect(reduce.getRealValue(1)).toBe(1);
        expect(reduce.getRealValue(-1)).toBe(9);
    })
    it ("check item exits in array", () => {
        const obs = [[1,2],[3,4]];
        expect(reduce.checkItemInArray(obs, [1,2])).toBeTruthy();
        expect(reduce.checkItemInArray(obs, [1,3])).toBeFalsy();
    })
    it ("check safe to step to", () => {
        const obs = [[1,2],[3,4]];
        const state = {
            obstacles: obs,
            safe:{
                valid: true
            }
        }
        expect(reduce.checkSafe(state, 1, 2)).toBe(false);
        expect(reduce.checkSafe(state, 1, 0)).toBe(true);
        state.safe.valid=false
        
        expect(reduce.checkSafe(state, 1, 2)).toBe(false);
        expect(reduce.checkSafe(state, 1, 0)).toBe(false);
    })
    
    it ("reached goal", () => {
        const state = {
            x_value: 1,
            y_value: 2,
            goal: {
                coord: [1,2]
            }
        }
        expect(reduce.reachedGoal(state)).toBe(true);
        state.x_value = 0;
        expect(reduce.reachedGoal(state)).toBe(false);
    })

    it ("get the diffrence in distances" ,()=>{
        expect(reduce.distanceDiffernece(1, 2)).toBe(1);
        expect(reduce.distanceDiffernece(2, 1)).toBe(-1);
    })

    it ("check point was in the path or not ", ()=>{
        let path = [[1,2],[3,4]]
        expect(reduce.checkCoveredPointInPath([1,2], path)).toBe(true);
        expect(reduce.checkCoveredPointInPath([2,0], path)).toBe(false);
    })

    it("Calculate the Next Step : ",()=>{
        // F B L R D all small letters
        let state = {
            x_value: 1,
            y_value: 2,
            direction: "NORTH",
        }
        expect(reduce.calculateNextStep(state, {payload: "f"})).toEqual({
            ...state,
            x_value: 1,
            y_value: 3
        })
        
        expect(reduce.calculateNextStep(state, {payload: "b"})).toEqual({
            ...state,
            x_value: 1,
            y_value: 1
        })
        

        expect(reduce.calculateNextStep(state, {payload: "r"})).toEqual({
            ...state,
            direction: "EAST"
        })

        expect(reduce.calculateNextStep(
            state,
            {payload: "l"}
        ))
        .toEqual({
            x_value:1,
            y_value:2,
            direction: "NORTH"
        })
    })

    
})

describe ("BFS Functions ", () => {
    it ("take next step", ()=>{
        
    })
})