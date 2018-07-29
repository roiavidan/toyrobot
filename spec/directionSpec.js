const directionModule = require("../src/direction.js");

describe("Direction class", () => {
  // Defining this expectation array allows us to test all possibilities with a single loop
  let EXPECTED_DIRECTIONS = [
    {name: "NORTH", x: 0, y: 1, right: 'EAST', left: 'WEST'},
    {name: "EAST", x: 1, y: 0, right: 'SOUTH', left: 'NORTH'},
    {name: "SOUTH", x: 0, y: -1, right: 'WEST', left: 'EAST'},
    {name: "WEST", x: -1, y: 0, right: 'NORTH', left: 'SOUTH'}
  ];

  EXPECTED_DIRECTIONS.map((dir) => {
    describe(dir.name, () => {
      beforeEach(() => {
        this.subject = new directionModule.Direction(dir.name);
      });

      it("has the correct direction name", () => {
        expect(this.subject.name()).toEqual(dir.name);
      });

      it("has the correct X step", () => {
        expect(this.subject.xStep()).toEqual(dir.x);
      });

      it("has the correct Y step", () => {
        expect(this.subject.yStep()).toEqual(dir.y);
      });

      it("returns the correct direction when turning Right", () => {
        expect(this.subject.turnRight().name()).toEqual(dir.right);
      });
    });
  });
});
