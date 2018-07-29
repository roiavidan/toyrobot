(() => {
  'use strict';

  const fsModule = require("fs");
  const simulatorModule = require("./simulator.js");

  /*
    A class implementing the main logic for the exercise and an entry point for the CLI interface.
    It concerns itself with loading an example, parsing it and calling the Simulator to execute each command.

    Only minimal error cases were considered here (i.e. example file not found or not loadable) and commands
    are expected to have a valid syntax. One command per line, empty lines are ignored.

    Also, it is the the biggest class as it contains what could be implemented separatedly as a Parser class for
    transforming the example files into parsed array of commands to be executed. For production code, this would
    probably be the correct implementation to follow.
  */
  class Main {
    constructor() {
      let simulator = new simulatorModule.Simulator();

      // Get the example file name from command line, if one is specified
      const getExampleFileName = () => {
        return process.argv[2] || "";
      };

      // Show an appropriate error message
      const handleUnexpectedError = (error) => {
        if (error.path === "") {
          console.log("Please specify an example file to execute");
        } else {
          console.log(`Unexpected error: ${error.message}`);
        }
      };

      // Load an example blob from the given file
      const loadExample = () => {
        return fsModule.readFileSync(getExampleFileName(), "utf8");
      };

      // Parse example blob into a one-command-per-line array
      const parseExampleLines = (exampleFileContents) => {
        return exampleFileContents.trim().split("\n");
      };

      // Parse the "PLACE" commands' arguments as expected by the Simulator
      // We expect the arguments to be valid in the sense of 3 elements of the correct type and comma-separated
      const placementArgsToArray = (argsAsString) => {
        let args = argsAsString.split(",");
        return [parseInt(args[0]), parseInt(args[1]), args[2].toUpperCase()];
      };

      // Entrypoint for the code challenge. We load the given example file here and generate a list
      // of commands to be executed.
      this.run = () => {
        try {
          parseExampleLines(loadExample()).map(this.executeCommand);
        } catch(e) {
          handleUnexpectedError(e);
        }
      };

      // Execute a single command. This method is responsible for parsing a single given command and calling
      // the correct Simulator method for executing it.
      // It would probably be better implemented as an Executor (through a Command Pattern mixed with an Observer and
      // Factory) but for the sake of simplicity we do a simple SWITCH/CASE statement here.
      this.executeCommand = (commandWithArgs) => {
        let splitCommandAndArgs = commandWithArgs.split(" ", 2);
        let command = splitCommandAndArgs[0].toUpperCase();
        let args = splitCommandAndArgs[1];

        switch (command) {
          case "PLACE":
            simulator.placeRobot.apply(null, placementArgsToArray(args));
            break;

          case "MOVE":
            simulator.moveRobot();
            break;

          case "LEFT":
            simulator.turnLeft();
            break;

          case "RIGHT":
            simulator.turnRight();
            break;

          case "REPORT":
            let report = simulator.reportRobotPlacement();
            if (report) {
              console.log(report);
            }
            break;
        }
      };
    }
  }

  // This is only needed for specs
  exports.Main = Main;

  new Main().run();
})();
