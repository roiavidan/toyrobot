beforeEach(() => {
  // This Jasmine custom equality tester helps us validate a Robot's placement object equality
  const customPlacementEquality = (first, second) => {
    if (first && first.x && first.y && first.f && second && second.x && second.y && second.f) {
      return first.x === second.x &&
             first.y === second.y &&
             first.f.name() === second.f.name();
    }
  };

  jasmine.addCustomEqualityTester(customPlacementEquality);
});
