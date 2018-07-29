(() => {
  'use strict';

  const directionModule = require("./direction.js");

  /*
    Toy Robot implementation.

    This class implements the Toy Robot itself.
    The Robot is concerned it's current position and where it might move next.
    It provides interfaces for setting and getting it's complete position and facing direction, and for
    determining a possible next position.
  */
  class Robot {
    constructor() {
      let currentPlacement;

      // Get where the Robot's at
      this.getPlacement = () => {
        return currentPlacement;
      };

      // Place the Robot somewhere facing a direction
      this.setPlacement = (x, y, direction) => {
        // Expected values for facing are NORTH, SOUTH, EAST or WEST.
        currentPlacement = { x: x, y: y, f: new directionModule.Direction(direction) };
      };

      // Getting the next placement does not change the Robot's current placement since the future placement
      // might not be valid on the Board. The Robot itself is agnostic to the Board and it's dimensions and will
      // just return a simple (X,Y,F) coordinate. It is up to the Simulator to use that info in conjunction with
      // the Board and place the Robot at that new position if it's valid or ignore it if not.
      this.nextPlacement = () => {
        if (currentPlacement) {
          return {
            x: currentPlacement.x + currentPlacement.f.xStep(),
            y: currentPlacement.y + currentPlacement.f.yStep(),
            f: currentPlacement.f
          };
        }
      };

      // Turning Right (or Left) updates the Robot's current placement since both these actions are ALWAYS valid
      // according to the rules of the challenge. We could use the same strategy as "nextPlacement" above, however,
      // this would result in more code in the Simulator and no real benefit from an implementation standpoint.
      this.turnRight = () => {
        if (currentPlacement) {
          currentPlacement.f = currentPlacement.f.turnRight();
        }

        return currentPlacement;
      };

      this.turnLeft = () => {
        if (currentPlacement) {
          currentPlacement.f = currentPlacement.f.turnLeft();
        }

        return currentPlacement;
      };
    }
  }

  exports.Robot = Robot;
})();
