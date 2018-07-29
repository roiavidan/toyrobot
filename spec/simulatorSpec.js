const simulatorModule = require("../src/simulator.js");

describe("Simulator class", () => {
  beforeEach(() => {
    this.subject = new simulatorModule.Simulator();
  });

  it("makes sure the Robot is initially not placed", () => {
    expect(this.subject.reportRobotPlacement()).toBeUndefined();
  });

  describe("#placeRobot", () => {
    beforeEach(() => {
      this.subject = new simulatorModule.Simulator();
      this.subject.placeRobot(3, 3, "WEST");
    });

    it("returns the expected placement", () => {
      expect(this.subject.reportRobotPlacement()).toEqual("3,3,WEST");
    });

    describe("when an out-of-bounds placement is attempted", () => {
      beforeEach(() => {
        this.subject = new simulatorModule.Simulator();
        this.subject.placeRobot(6, 3, "NORTH");
      });

      it("is ignored", () => {
        expect(this.subject.reportRobotPlacement()).toBeUndefined();
      });
    });

    describe("#moveRobot", () => {
      beforeEach(() => {
        this.subject = new simulatorModule.Simulator();
      });

      it("does not do anything if the robot is not yet placed", () => {
        this.subject.moveRobot();
        expect(this.subject.reportRobotPlacement()).toBeUndefined();
      });

      it("moves one step forward if inside bounds", () => {
        this.subject.placeRobot(0, 0, "NORTH");
        this.subject.moveRobot();
        expect(this.subject.reportRobotPlacement()).toEqual("0,1,NORTH");
      });

      describe("when the Robot is facing the Table's border", () => {
        it("does not move forward", () => {
          this.subject.placeRobot(4, 0, "EAST");
          this.subject.moveRobot();
          expect(this.subject.reportRobotPlacement()).toEqual("4,0,EAST");
        });
      });
    });

    describe("#turnRight and #turnLeft", () => {
      beforeEach(() => {
        this.subject = new simulatorModule.Simulator();
        this.subject.placeRobot(2, 3, "SOUTH");
      });

      it("turns the Robot -90 degrees while keeping it's current position", () => {
        this.subject.turnRight();
        expect(this.subject.reportRobotPlacement()).toEqual("2,3,WEST");
      });

      it("turns the Robot 90 degrees while keeping it's current position", () => {
        this.subject.turnLeft();
        expect(this.subject.reportRobotPlacement()).toEqual("2,3,EAST");
      });

      describe("when the Robot has not been placed yet", () => {
        beforeEach(() => {
          this.subject = new simulatorModule.Simulator();
        });

        it("does not turn right", () => {
          this.subject.turnRight();
          expect(this.subject.reportRobotPlacement()).toBeUndefined();
        });

        it("does not turn left", () => {
          this.subject.turnLeft();
          expect(this.subject.reportRobotPlacement()).toBeUndefined();
        });
      });
    });
  });
});
