const reduce = require('../store/rover.reducer');


describe ("Testing Class Rover in the rover.reducer", () => {
    
    it("test rover can move forward one cell", () => {
        let rover = reduce.roverReducer
        rover['f']()
        expect(rover['location']['y']).toBe(1)
    })

    it("test rover can move backward one cell", () => {
        let rover = reduce.roverReducer
        rover['b']()
        expect(rover['location']['y']).toEqual(0)
    })

    it("Test the rover can rotate in the left direction", () => {
        let rover = reduce.roverReducer
        rover['l']()
        expect(rover['location']['direction']).toBe("WEST")
    })

    it("Test the rover can rotate in the right direction", () => {
        let rover = reduce.roverReducer
        rover['r']()
        expect(rover['location']['direction']).toBe("NORTH")
    })

    it ("check rover doesnot go out of the grid not smaller than 0 for X Axises", () => {
        let rover = reduce.roverReducer
        rover['l']()
        rover['f']()
        expect(rover['location']['x']).toEqual(9)
    })
    it ('Check rover doesnot go out of the grid not bigger than 9 for Y Axises', () => {
        let rover = reduce.roverReducer
        rover['l']()
        rover['l']()
        rover['f']()
        expect(rover['location']['x']).toEqual(0)
    })
    
    it ("check rover doesnot go out of the grid not smaller than 0 for Y Axises", () => {
        let rover = reduce.roverReducer
        rover['l']()
        rover['b']()
        expect(rover['location']['y']).toEqual(9)
    })

    it ("check rover doesnot go out of the grid not bigger than 9 for Y Axises", () => {
        let rover = reduce.roverReducer
        rover['f']()
        expect(rover['location']['y']).toEqual(0)
    })


})

