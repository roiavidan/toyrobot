(() => {
  'use strict';

  // This array defines all the valid directions the Robot can face and their corresponding
  // X and Y steps. These steps need to be applied to the Robot's current position to calculate its next position.
  let DIRECTIONS = [
    {name: "NORTH", x: 0, y: 1},
    {name: "EAST", x: 1, y: 0},
    {name: "SOUTH", x: 0, y: -1},
    {name: "WEST", x: -1, y: 0}
  ];

  // Helper function for turning Right or Left
  const nextDirectionName = (currentDirectionName, delta) => {
    let currentDirectionIndex = DIRECTIONS.findIndex((dir) => { return dir.name === currentDirectionName; });
    let nextRotatingIndex = (4 + currentDirectionIndex + delta) % 4;
    return DIRECTIONS[nextRotatingIndex].name;
  };

  /*
    Facing Direction abstraction class.
    This class implements handling of directions and turning.
  */
  class Direction {
    constructor(directionName) {
      let currentDirection = DIRECTIONS.find((dir) => { return dir.name === directionName; });

      this.name = () => {
        return currentDirection.name;
      };

      this.xStep = () => {
        return currentDirection.x;
      };

      this.yStep = () => {
        return currentDirection.y;
      };

      this.turnRight = () => {
        return new Direction(nextDirectionName(this.name(), 1));
      };

      this.turnLeft = () => {
        return new Direction(nextDirectionName(this.name(), -1));
      };
    }
  }

  exports.Direction = Direction;
})();
