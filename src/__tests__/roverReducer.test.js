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

    it ('check that the obstacles are added to the gird', () => {
        let rover = reduce.roverReducer
        rover.addObstacle(1,2)
        rover.addObstacle(4,1)
        rover.addObstacle(8,2)

        expect(rover['obstacles'].length).toEqual(3)
        expect(rover.obstacles[0]).toEqual([1,2])
    })

    it ('check that only one goal is added to the gird', () => {
        let rover = reduce.roverReducer
        rover.addGoal(2,2)
        rover.addGoal(0,1)
        rover.addGoal(3,2)

        expect(rover['goal'].coord).toEqual([3,2])
        expect(rover['goal'].coord).not.toEqual([0,1])
    })

    it ('check that there is no duplicate obstacles coordinates', () => {
        let rover = reduce.roverReducer
        // Added before so there are 3 obatacles didnot increase from before
        rover.addObstacle(1,2)
        rover.addObstacle(4,1)
        rover.addObstacle(8,2)

        expect(rover['obstacles'].length).toEqual(3)
    })

    it('check that the rover stops before stepping into an obstacle', () => {
        // there is an obstacle in location [0,1]
        let rover = reduce.roverReducer
        rover.addObstacle(0,1)
        rover.f()
        expect(rover['location']).toEqual({x:0, y:0, direction:"NORTH"})
    })

    it('check that the rover stops before Goal is reached', () => {
        // there is an obstacle in location [0,1]
        let rover = reduce.roverReducer
        rover.addGoal(1,0)
        rover.r()
        rover.f()
        expect(rover['location']).toEqual({x:0, y:0, direction:"EAST"})
    })
    

})

