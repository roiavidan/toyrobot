const mainModule = require("../src/main.js");
const simulatorModule = require("../src/simulator.js");
const fsModule = require("fs");

describe("main", () => {
  beforeEach(() => {
    this.originalArgv = process.argv;
    spyOn(console, 'log');
  });

  afterEach(() => {
    Object.defineProperty(process, 'argv', { value: this.originalArgv });
  });

  describe("when no example file is given", () => {
    beforeEach(() => {
      Object.defineProperty(process, 'argv', { value: ['path', 'jsfile'] });
    });

    it("shows a missing file error message", () => {
      (new mainModule.Main()).run();
      expect(console.log).toHaveBeenCalledWith("Please specify an example file to execute");
    });
  });

  describe("when an example file is given", () => {
    beforeEach(() => {
      Object.defineProperty(process, 'argv', { value: ['path', 'jsfile', 'example'] });
    });

    it("returns the given filename", () => {
      spyOn(fsModule, 'readFileSync').and.returnValue("foo\n");
      spyOn(simulatorModule, 'Simulator');
      (new mainModule.Main()).run();
      expect(simulatorModule.Simulator).toHaveBeenCalled();
    });

    it("execute the list of parsed commands", () => {
      let main = new mainModule.Main();
      spyOn(fsModule, 'readFileSync').and.returnValue("foo\nbar\n");
      spyOn(main, 'executeCommand');
      main.run();
      expect(main.executeCommand.calls.count()).toEqual(2);
    });

    describe("when unable to load that file", () => {
      it("shows a generic error message", () => {
        spyOn(fsModule, 'readFileSync').and.throwError('oops');
        (new mainModule.Main()).run();
        expect(console.log).toHaveBeenCalledWith("Unexpected error: oops");
      });
    });
  });

  describe("#executeCommand", () => {
    beforeEach(() => {
      Object.defineProperty(process, 'argv', { value: ['path', 'jsfile', 'example'] });
      let originalSimulatorConstructor = simulatorModule.Simulator;
      let self = this;
      spyOn(simulatorModule, "Simulator").and.callFake(() => {
        self.instance = new originalSimulatorConstructor();
        spyOn(self.instance, 'placeRobot').and.callThrough();
        spyOn(self.instance, 'moveRobot');
        spyOn(self.instance, 'turnLeft');
        spyOn(self.instance, 'turnRight');
        spyOn(self.instance, 'reportRobotPlacement').and.callThrough();
        return self.instance;
      });
    });

    it("calls the Simulator for the PLACE command", () => {
      spyOn(fsModule, 'readFileSync').and.returnValue("PLACE 0,0,NORTH\n");
      (new mainModule.Main()).run();
      expect(this.instance.placeRobot).toHaveBeenCalledWith(0, 0, "NORTH");
    });

    it("calls the Simulator for the MOVE command", () => {
      spyOn(fsModule, 'readFileSync').and.returnValue("MOVE\n");
      (new mainModule.Main()).run();
      expect(this.instance.moveRobot).toHaveBeenCalledWith();
    });

    it("calls the Simulator for the LEFT command", () => {
      spyOn(fsModule, 'readFileSync').and.returnValue("LEFT\n");
      (new mainModule.Main()).run();
      expect(this.instance.turnLeft).toHaveBeenCalledWith();
    });

    it("calls the Simulator for the RIGHT command", () => {
      spyOn(fsModule, 'readFileSync').and.returnValue("RIGHT\n");
      (new mainModule.Main()).run();
      expect(this.instance.turnRight).toHaveBeenCalledWith();
    });

    it("calls the Simulator for the REPORT command", () => {
      spyOn(fsModule, 'readFileSync').and.returnValue("REPORT\n");
      (new mainModule.Main()).run();
      expect(this.instance.reportRobotPlacement).toHaveBeenCalledWith();
    });

    describe("when there is something to report", () => {
      it("outputs a report to the console", () => {
        spyOn(fsModule, 'readFileSync').and.returnValue("PLACE 1,2,EAST\nREPORT\n");
        (new mainModule.Main()).run();
        expect(console.log).toHaveBeenCalledWith("1,2,EAST");
      });
    });
  });
});
