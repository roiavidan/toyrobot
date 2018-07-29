# Toy Robot Code Challenge

This folder contains the solution to IRESS's Toy Robot code Challenge.

## Overview

### Requirements

The following requirements were extracted from the problem description:

- Write an application for simulating a Toy Robot moving on a square table top;
- The table's dimensions are: 5 units x 5 units;
- The table's origin (0,0) can be considered to be the SOUTH WEST most corner;
- There are no other obstructions on the table surface;
- The Robot is free to roam around the surface of the table, but must be prevented from falling to destruction;
- Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed;
- The robot should accepts the following commands:
  - **PLACE _X,Y,F_**: will put the toy robot on the table in position (X,Y) and facing *NORTH*, *SOUTH*, *EAST* or *WEST*.
    - This must be the first command to be issued. After that, any sequence of commands may follow, in any order, including another **PLACE** command;
    - The application should discard all commands in the sequence until a valid **PLACE** command has been executed;
  - **MOVE**: will move the toy robot one unit forward in the direction it is currently facing;
  - **LEFT** or **RIGHT**: will rotate the robot 90 degrees in the specified direction without changing the position of the robot;
  - **REPORT**: will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.
- Input can be given from a file, or from standard input, as the developer chooses;
- Test data should be provided to exercise the application;
- It is not required to provide any graphical output showing the movement of the toy robot.

### Design and Implementation considerations

The following paragraphs detail design choices which were made consciously throughout the code and which can (and in most cases
should) be done differently were this code written for production use.

These choices were made based on the requirement for putting "emphasis on simple and elegant solutions over elaborate patterns".

- *Commands*:<br />
  Only known commands are executed. An invalid command (i.e. "FOO") will simply be silently ignored. No special error is given. Also, commands can be provided either in lower or upper case but are expected to be written according to specification - so the "PLACE" command for example is expected to get 3 comman-separated arguments and will not handle an error case for that.

- *Constructor and method argument validation:*<br />
  Validation of those was limited to reduce the amount of code which needs to be written and tested. Production code should handle 100% of cases and validate for everything, but I assume the exercise concerns itself with the overall design and not with argument validation.
  There are comments in each class regarding argument assumptions.

- *Encapsulation*:<br />
  Unfortunately, ES6 still does not allow for private data and methods definition, so a "hack" needs to be used to achieve this effect. There are various known hiding techniques, and the one I've chosen is to define private data inside the constructor.
  A known *caveat* for this choice is that public methods need to be defined using the `this.somethingSomething = () => {}` syntax inside the constructor.
  I reckon readability is not really compromised and I value encapsulation more, so I believe it was a reasonable choice.

- *Code quality*:<br />
  Code quality is important as it guarantees we attend the requirements, write maintainable code with agreed upon conventions and have 100% test coverage to reduce the possibility of runtime errors.
  All of the above considerations were achieved in this solution by using:
  - [Jasmine](https://jasmine.github.io/index.html) for testing;
  - [Istanbul](https://istanbul.js.org/) for test coverage; and
  - [JSHint](http://jshint.com/) for linting and coding conventions


- *Testing*:<br />
  Unit tests are provided to guarantee the implementation works according to requirements, however, automated integration tests were not explicitly written since the `data/` folder contains examples that can be run and serve as minimal integration tests.

- *Input*:<br />
  The current implementation assumes input for this solution must come uniquely through an *example file*. Standard Input is not supported.

### What's in the folder?

Here is a brief description of the provided folder and file structure:

```
.
+-- bin
|   +-- in-docker        <-- Run command inside a Docker container
|   +-- run              <-- Run Toy Robot
|   +-- test             <-- Run Test Suite
+-- data                 <-- test examples
|   +-- example1.txt
|   +-- example2.txt
|   +-- example3.txt
|   +-- example4.txt
+-- spec                 <-- Unit tests
|   +-- helpers
|   +-- support
|   +-- directionSpec.js
|   +-- mainSpec.js
|   +-- robotSpec.js
|   +-- simulatorSpec.js
|   +-- tableSpec.js
+-- src                  <-- Solution implementation. One file per class
|   +-- direction.js
|   +-- main.js
|   +-- robot.js
|   +-- simulator.js
|   +-- table.js
+-- .dockerignore        <-- Do not add .git/ to Docker image
+-- docker-compose.yml   <-- Docker compose config file
+-- Dockerfile           <-- Docker image build file
+-- package-lock.json
+-- package.json
+-- README.md            <-- This file
```

**NOTE**: This solution has been developed on a **Mac**, so files are LF-terminated (in contrast with CR/LF-terminated for Windows). I am uncertain if this will have any impact on the correct execution of the solution, but if it does, I recommend trying to run it on a Mac or a Linux machine.

## Usage

The solution was written in ES6 and runs on [NodeJS v8](https://nodejs.org/en/).

The recommended form of running and testing the solution is by using [Docker](https://www.docker.com/), however, it should be possible to run it natively if *Node* and *NPM* are available locally.

### Preparing the Environment

For **Docker** (the preferred way):

- Install [Docker Community Edition](https://www.docker.com/community-edition) if it's not already installed.

- No need to build or prepare anything, as we will be using *Docker Compose* which will build the dev image on the first usage.

For **native**:

- Make sure Node v8.11 is installed (the only version this code is tested against). Other versions might also work, but no guarantee.

- Run

```bash
$ npm install
```

**NOTE**: For native execution, a Unix-like environment is needed!

### Running Tests

The automated test suite will execute the following steps:
1. Code Quality - JSHint;
2. Unit Testing - Jasmine; and
3. Test Coverage - Istanbul.

To run it using **Docker** (the preferred way):

```bash
$ bin/in-docker bin/test
```

Or **natively**:

```bash
$ bin/test
```

#### Expected output

```
> toyrobot@0.0.1 pretest /app
> jshint src spec


> toyrobot@0.0.1 test /app
> istanbul cover jasmine

Please specify an example file to execute
Randomized with seed 44169
Started
...............................................


47 specs, 0 failures
Finished in 0.117 seconds
Randomized with seed 44169 (jasmine --random=true --seed=44169)
=============================================================================
Writing coverage object [/app/coverage/coverage.json]
Writing coverage reports at [/app/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 100% ( 294/294 )
Branches     : 100% ( 42/42 )
Functions    : 100% ( 5/5 )
Lines        : 100% ( 292/292 )
================================================================================
```

### Running an example

The `data/` folder comes with several example files.

To run a specific example, execute:

In **Docker** (the preferred way):

```bash
$ bin/in-docker bin/run data/example1.txt
```

Or **natively**:

```bash
$ bin/run data/example1.txt
```

#### Expected output

```
0,1,NORTH
```
