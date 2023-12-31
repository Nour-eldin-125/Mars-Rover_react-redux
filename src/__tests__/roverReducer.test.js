const { gridSize } = require('../constants');
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
        rover.reset()
        rover['r']()
        rover['b']()
        expect(rover['location']['x']).toEqual(gridSize-1)
    })
    it ('Check rover doesnot go out of the grid not bigger than 9 for Y Axises', () => {
        let rover = reduce.roverReducer
        rover.reset()
        for (let i =0 ; i < gridSize+1; i++) {
            rover['f']()
        }
        expect(rover['location']['x']).toEqual(0)
    })
    
    it ("check rover doesnot go out of the grid not smaller than 0 for Y Axises", () => {
        let rover = reduce.roverReducer
        rover.reset()
        rover['b']()
        expect(rover['location']['y']).toEqual(gridSize-1)
    })

    it ("check rover doesnot go out of the grid not bigger than 9 for Y Axises", () => {
        let rover = reduce.roverReducer
        rover.reset()
        rover.r()
        for(let i = 0 ; i<gridSize+1 ; i++){
            rover.f()
        }
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

        rover.resetObstacles()

        rover.addObstacle(1,2)
        rover.addObstacle(1,2)

        expect(rover['obstacles'].length).toEqual(1)
    })

    it('check that the rover stops before stepping into an obstacle', () => {
        // there is an obstacle in location [0,1]
        let rover = reduce.roverReducer
        rover.reset()
        rover.addObstacle(0,1)
        rover.f()
        expect(rover['location']).toEqual({x:0, y:0, direction:"NORTH"})
    })

    it('check that the rover stops before Goal is reached', () => {
        // there is an obstacle in location [0,1]
        let rover = reduce.roverReducer
        rover.reset()
        rover.addGoal(1,0)
        rover.r()
        rover.f()
        expect(rover['location']).toEqual({x:0, y:0, direction:"EAST"})
    })

    it ("check that the obstacles can reset to empty array on the reset button", () => {
        let rover = reduce.roverReducer
        rover.resetObstacles()
        expect(rover['obstacles']).toEqual([])
    })

    it ("check that the goal can reset to empty array on the reset button", () => {
        let rover = reduce.roverReducer
        rover.resetGoal()
        expect(rover['goal']['coord']).toEqual([])
        expect(rover['goal']['reached']).toEqual(false)
    })

    // The check for the last part Task 3 the search algorithm
    it ("check that the rover can reaches the goal after the autosearch button is clicked", () => {
        let rover = reduce.roverReducer
        
        rover.addGoal(5,5)
        rover.autoSearch()

        expect(rover['goal']['reached']).toEqual(true)
    })

    it("check that the rover can avoid simple obstacles \n1 or 2 in the path to the goal and can rerout the path to reach the goal", () => {
        let rover = reduce.roverReducer
        rover.reset()
        
        rover.addGoal(5,5)
        rover.addObstacle(0,2)
        rover.addObstacle(3,0)

        rover.autoSearch()

        expect(rover['goal']['reached']).toEqual(true)
    })

    it ("check rover can reach goal in C shaped obstacles\nthe obstacles surround the goal except for specific one opend path that rover should take",()=>{
        let rover = reduce.roverReducer
        rover.reset()
        
        rover.addObstacle(4,6)                          // *    *   *
        rover.addObstacle(4,5)                          // *    G
        rover.addObstacle(4,4)                          // *    *   *
        rover.addObstacle(5,4)                          
        rover.addObstacle(5,6)
        rover.addObstacle(6,4)
        rover.addObstacle(6,6)
        rover.addGoal(5,5)

        rover.autoSearch()

        expect(rover['goal']['reached']).toEqual(true)
        expect(rover.location.x).toEqual(6)
        expect(rover.location.y).toEqual(5)
    })
        
    it ('check that rover can reach the goal with the Horizontal line obstacles that the obstacles form a line with only one coordinates available to the rover to move',
    ()=>{
        let rover = reduce.roverReducer
        rover.reset()
        for (let i = 0; i < 10; i++){
            if(i != 8) {rover.addObstacle(i,4)}
        } 
        rover.addGoal(5,5)
        rover.autoSearch()
        expect(rover['goal']['reached']).toEqual(true)
        expect(rover.location.x).toEqual(6)
        expect(rover.location.y).toEqual(5)
    })
    
    it ('check that rover can reach the goal with the Vertical line obstacles that the obstacles form a line with only one coordinates available to the rover to move',
    ()=>{
        let rover = reduce.roverReducer
        rover.reset()
        for (let i = 0; i < 10; i++){
            if(i != 8) {rover.addObstacle(4,i)}
        } 
        rover.addGoal(5,5)
        rover.autoSearch()
        expect(rover['goal']['reached']).toEqual(true)
        expect(rover.location.x).toEqual(5)
        expect(rover.location.y).toEqual(6)
    })

    it('check if rover is stuck in an obstacle from all direction to stop and state that it is stuck', () => {
        let rover = reduce.roverReducer
        rover.reset()
        
        rover.addGoal(5,5)

        rover.addObstacle(1,0)
        rover.addObstacle(0,1)
        rover.addObstacle(0,gridSize-1)
        rover.addObstacle(gridSize-1,0)

        rover.autoSearch()
        
        expect(rover.stuck).toEqual(true)

    })

    it ("check if the rover can reach the goal on a maze like obstacles shape", () => {
        let rover = reduce.roverReducer
        rover.reset()
        let obstacles = [
            [0,3],[1,3],[2,3],[3,3],
            [1,1],[2,1],[3,1],[3,2],
            [1,9],[1,8],[1,7],
            [2,8],[3,8],[4,8],
            [1,5],[2,5],[3,5],[5,5],[4,5],
            [5,5],[5,4],[5,3],[5,2],[5,1],[5,0],
            [6,0],[7,0],[8,0],[9,0],
            [6,7],[6,8],[6,9],
            [7,7],[8,7],[8,8],
            [7,5],[7,4],[7,3],
            [8,5],[8,3],[8,2],
            [9,5],[0,9]
        ];
        obstacles.forEach((obstacle) => rover.addObstacle(obstacle[0], obstacle[1]))
        rover.addGoal(7,8)
        rover.autoSearch()
        expect(rover['goal']['reached']).toEqual(true)
        expect(rover.location.x).toEqual(7)
        expect(rover.location.y).toEqual(9)
    })

})

