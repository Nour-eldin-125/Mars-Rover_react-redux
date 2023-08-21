# Mars Rover : 
## Problem definition:
### Part 1:
The rover is given a command string which contains multiple commands. This string must then be 
broken into each individual command and that command then executed. The valid commands are:
```
F -> Move forward on current heading 
B -> Move backwards on current heading 
L -> Rotate left by 90 degrees
R -> Rotate right by 90 degrees
```
An example command might be ``` 
FLFFFRFLB ``` 
the rover reports it’s current coordinates 
and heading in the format ``` (-2, 2) WEST ``` (negative coordinates are valid.)

### Solution : 
Technology used will be react and react-redux for manpulating the state of the rover.

1. first create component rover that contains the rover postition and direction

2. second create the function conpmonet that contains the code for handeling the rover movement and changing the direction of the rover.

3. returning the rover object and updating the state and printing the value of the rover after each update till the command ends and return the value of the coordinates and the direction.

### Part 2:
Previous missions have had to be aborted due to obstacles that caused damage to the rover. Given a set of coordinates for all the known obstacles in the format: ```[[1,4], [3,5], [7,4]]```
When the rover would enter a coordinate with an obstacle, instead stop at the coordinate immediately before and report position, heading and Stopped due to collision, e.g. (3, 4) WEST STOPPED

### Solution:
1. create function to add obstacles
2. create function to check if the next step contains obstacle or not.
3. go forward if ok or stop and report if obstacle.
