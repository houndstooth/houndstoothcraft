# development

Please begin by installing node.

```
git clone https://github.com/houndstooth/houndstoothcraft.git
cd houndstoothcraft
npm run setup
```

## commands

The `npm run setup` command takes care of all the initial set up of your development environment, finishing off by calling `npm start` for you.
 
The `npm start` command serves a development version of the application, as well as an integration test runner. It opens tabs for these in a new Google Chrome window, along with tabs for the coverage report, the task management software used for the project, the Github repository, and finally the production app. Finally, `npm start` opens the repository in Webstorm.

During development, run unit tests regularly with `npm test`.

When you have made some commits, run `npm run ship` to share your work. This command will push your code changes to Github and the updated application to Google Cloud Platform. Your deployment will be rejected if your code has not been rebased against the latest changes.
Your code must also use the most up-to-date versions of all dependencies, be free of linting errors, pass test coverage thresholds, and of course pass all tests.

`npm run setup` will pull the latest code from each submodule. If you are picking up on a workstation which has been setup recently but does not have the latest code, `npm run pull` is your command. It pulls the parent and all submodules, with rebase in both cases (this project practices single-branch development).

When you're done developing, just run `npm stop` to shut everything down.

## effect submodules

Each effect users can play with in the application lives in its own Git repository, which is submoduled to this parent repository. The effect submodules are not standalone; they rely on the shared code here to function. The separation is intended primarily for their commit histories.

Each of these repos exports at least one effect object, a type of [houndstooth](#houndstooth) object, which is registered in the `effects` index to be discovered by the main source code of the application.

Each repo must also follow a particular directory structure in order for its unit and integration tests to be discovered by the central testing tools.

## testing

This code base includes two test suites:

- unit suite
    - runs in <5 seconds
    - runs in the terminal with the help of `ts-node` and the Jasmine CLI test runner.
    - mocks the DOM as needed without any dependencies
    
- integration suite
    - runs in ~10 seconds
    - uses Karma as the test runner
    - consists of tests of the final renderings, inspecting individual pixels
    - the debug mode HTML page features an attractive reporter, as well as visualizations of the houndsteeth under test
    
Both use Jasmine as the testing framework along with its mocking and assertion libraries. Both suites are transpiled to ES5 using the same Typescript configuration as the implementation code.

All tests, whether unit or integration, begin with a `beforeEach` which calls `resetStates`, to reset both the `appState` and `patternState`.

Integration tests are watched in one of your automatically opened browser tabs. Run the unit tests in your IDE at `bin/test/unit.sh` (coverage report watcher is re-running them too). 

## cross platform

This project has been developed on both Mac OS and Windows workstations, and all development tools have been put together with supporting this in mind. On Windows, Git BASH is used to emulate a *NIX environment.

# the code

See [README.md](https://github.com/houndstooth/houndstoothcraft/blob/main/README.md).
