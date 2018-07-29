(() => {
  'use strict';

  const robotModule = require("./robot.js");
  const tableModule = require("./table.js");

  // This value comes from the challenge's requirements
  const SQUARE_TABLE_SIDE_DIMENSION = 5;

  /*
    Toy Robot Simulator.

    This class implements the controller logic for this challenge. It binds the Robot and Table together and applies
    commands to them.

    Commands are implemented inside this class for the purpose of simplicity of the exercise, however, in a real
    production scenario, they would probably be implemented as separate Command classes (i.e. Command pattern)
    which perform the actual work and the Simulator would only delegate to them.

    Commands are explicitly exposed here instead of exposing a single "execute(cmd, args)" method, since I want
    to perform command parsing outside the context of the Simulator.
    This provides an abstration which allows me to call Simulator actions from different contexts exactly the same way.
  */
  class Simulator {
    constructor() {
      let robot = new robotModule.Robot();
      let table = new tableModule.Table(SQUARE_TABLE_SIDE_DIMENSION, SQUARE_TABLE_SIDE_DIMENSION);

      // Place the Robot on the board if the given coordinates are within bounds
      this.placeRobot = (x, y, f) => {
        if (table.isWithinBounds(x, y)) {
          robot.setPlacement(x, y, f);
        }
      };

      // Move the Robot one step forward in the direction it currently faces (if possible)
      this.moveRobot = () => {
        let nextPlacement = robot.nextPlacement();
        if (nextPlacement && table.isWithinBounds(nextPlacement.x, nextPlacement.y)) {
          robot.setPlacement(nextPlacement.x, nextPlacement.y, nextPlacement.f.name());
        }
      };

      // Turn the Robot to the Right while keeping it's current position
      this.turnRight = () => {
        robot.turnRight();
      };

      // Turn the Robot to the Left while keeping it's current position
      this.turnLeft = () => {
        robot.turnLeft();
      };

      // Get the Robot's current position and facing (i.e. Placement) as a comma-separated string
      this.reportRobotPlacement = () => {
        let placement = robot.getPlacement();
        if (placement) {
          return `${placement.x},${placement.y},${placement.f.name()}`;
        }
      };
    }
  }

  exports.Simulator = Simulator;
})();
