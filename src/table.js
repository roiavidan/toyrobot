(() => {
  'use strict';

  /*
    Table top for the Toy Robot simulator.

    This class is concerned with the surfuce on which the Robot can move.
    It provides an interface to define and query that surface agnostically.

    An important design consideration was done here from the unit testing perspective.
    By choosing to hide the dimensions internally, we are unable to test the class's construction in a pure form and
    must relay on the "isWithinBounds" interface to validate it. This means there will only be unit testing for that
    specific interface. This is not a problem as I personally consider testing only class/method boundaries to be
    a valid approach (i.e. I do not concern myself with the internals of the implementation).

    This is also the case for other classes in this solution!
  */
  class Table {
    constructor(width, height) {
      // For the sake of simplicity, no range checking is performed here to verify valid values are passed to
      // the constructor. For real production code, validating that width > 0 and height > 0 and maybe even width === height
      // if squareness would be necessary here.
      let dimensions = { w: width, h: height };

      // Unique public interface - check if a given coordinate is within the table's bounds
      this.isWithinBounds = (x, y) => {
        return (x >= 0) && (y >= 0) && (x < dimensions.w) && (y < dimensions.h);
      };
    }
  }

  exports.Table = Table;
})();
