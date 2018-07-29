const tableModule = require("../src/table.js");

describe("Table class", () => {
  beforeEach(() => {
    this.someWidth = 1 + Math.floor(Math.random() * Math.floor(10));
    this.someHeight = 1 + Math.floor(Math.random() * Math.floor(10));
    this.subject = new tableModule.Table(this.someWidth, this.someHeight);
  });

  it("constructs a Table instance with the requested dimensions", () => {
    expect(this.subject.isWithinBounds(this.someWidth, this.someHeight)).toEqual(false);
    expect(this.subject.isWithinBounds(this.someWidth-1, this.someHeight-1)).toEqual(true);
  });

  it("returns false for negative X coordinate", () => {
    expect(this.subject.isWithinBounds(-1, 0)).toEqual(false);
  });

  it("returns false for negative Y coordinate", () => {
    expect(this.subject.isWithinBounds(3, -2)).toEqual(false);
  });
});
