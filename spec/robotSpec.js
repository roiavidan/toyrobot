const robotModule = require("../src/robot.js");
const directionModule = require("../src/direction.js");

describe("Robot class", () => {
  describe("when the Robot has not yet been placed", () => {
    beforeEach(() => {
      this.subject = new robotModule.Robot();
    });

    it("returns undefined placement if Robot was not placed yet", () => {
      expect(this.subject.getPlacement()).toBeUndefined();
    });

    it("can't calculate the next position", () => {
      expect(this.subject.nextPlacement()).toBeUndefined();
    });

    it("can't turn right", () => {
      expect(this.subject.turnRight()).toBeUndefined();
    });

    it("can't turn left", () => {
      expect(this.subject.turnLeft()).toBeUndefined();
    });
  });

  describe("when the Robot has been placed somewhere", () => {
    beforeEach(() => {
      this.subject = new robotModule.Robot();
      this.subject.setPlacement(2, 3, "SOUTH");
    });

    it("returns the correct placement", () => {
      expect(this.subject.getPlacement()).toEqual({x: 2, y: 3, f: new directionModule.Direction("SOUTH")});
    });

    it("returns the next position", () => {
      expect(this.subject.nextPlacement()).toEqual({x: 2, y: 2, f: new directionModule.Direction("SOUTH")});
    });

    it("can turn right", () => {
      expect(this.subject.turnRight()).toEqual({x: 2, y: 3, f: new directionModule.Direction("WEST")});
    });

    it("can turn left", () => {
      expect(this.subject.turnLeft()).toEqual({x: 2, y: 3, f: new directionModule.Direction("EAST")});
    });
  });
});
