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
