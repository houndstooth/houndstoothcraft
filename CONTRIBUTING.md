# development

Please begin by installing node.

```
git clone https://github.com/houndstooth/web-render.git
cd web-render
npm run setup
```

## commands

The `npm run setup` command takes care of all the initial set up of your development environment, finishing off by calling `npm start` for you.
 
The `npm start` command serves a development version of the application, as well as an integration test runner. It opens tabs for these in a new Google Chrome window, along with tabs for the coverage report, the task management software used for the project, the Github repository, and finally the production app. Finally, `npm start` opens the repository in Webstorm.

During development, run unit tests regularly with `npm test`.

When you have made some commits, run `npm run ship` to share your work. This command will push your code changes to Github and the updated application to Pivotal Web Services. Your deployment will be rejected if your code has not been rebased against the latest changes.
Your code must also use the most up-to-date versions of all dependencies, be free of linting errors, pass test coverage thresholds, and of course pass all tests.

`npm run setup` will pull the latest code from each submodule. If you are picking up on a workstation which has been setup recently but does not have the latest code, `npm run pull` is your command. It pulls the parent and all submodules, with rebase in both cases (this project practices single-branch development).

When you're done developing, just run `npm stop` to shut everything down.

## effect submodules

Each houndstooth effect users can play with in the application lives in its own Git repository, which is submoduled to this parent repository. The effect submodules are not standalone; they rely on the shared code here to function. The separation is intended primarily for their commit histories.

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

See [README.md](https://github.com/houndstooth/web-render/blob/master/README.md).

# settings

See the existing settings modules for living examples. There are examples of nested settings modules in `ColorSettings` and `StripeSettings`; the latter case boasts even double nesting.

## adding a new setting to an existing settings module

### setting itself

Register  `readonly coolNew: Coolness` in the `ExistingSettings` interface.

### setting default
   
Define a `DEFAULT_COOL_NEW` value and register it on the `DEFAULT_EXISTING_SETTINGS` constant. 

Without this default to be able to fall back on, Houndstooth will not be able to assume it will always get a `coolNew` when it asks for one, and annoying null checking code will ensue. 
    
### type mapping

Make sure Houndstooth is able to tell what type of value it should expect for the `coolNew` setting when it is got or set. 

Now, it certainly seems possible that one could engineer this situation so that Houndstooth could figure this out from you already having said that `coolNew` is a `Coolness` type in the main `Settings` interface, but at the moment some combination of my limitations and Typescript's have prevented this. 

So in the meantime, to do so, start by locating the `ExistingSettingsNamesByType` type. You can see that this type is equal to the `SettingsNamesByTypeBase` interface, but with `Overwrite`s for some types. These types are the ones for which `ExistingSettings` includes a setting that has them as their value's type. 

The `SettingsNamesByTypeBase` interface has a property for any type that is used on any Houndstooth setting. Each of these properties is called `...TypedSettingsNames`, because it ultimately becomes a string enumeration of names of settings whose values have the given type. Each one begins as a dummy string, `_`, designed to not match any string one might try to pass as the settings name key to `setPatternStateForTest` or `patternState.get`. 

The `ExistingSettingsNamesByType` is later put into a union with every other settings module's `...SettingsNamesByType`s, and the resultant `SettingsNamesByType` is then used by the `SettingsNamesToTypesMap` to map each setting's name to its value's type.

So, if not a single settings module's `...SettingsNamesByType` overwrote any of the `SettingsNamesByTypeBase`'s non-matching `_`'s for each type's `...TypedSettingsNames`, then no setting name (besides `_`) passed as a kay when getting or setting settings could ever match anything.

More realistically, if not a single settings module's `...SettingsNamesByType` overwrote any of the `SettingsNamesByTypeBase`'s non-matcher `_` for a given type's `...TypedSettingsNames`, then no setting name passed as a key when getting or setting settings would ever match just for that type. This would be an indication that no setting has this type anymore, and this type's `...TypedSettingsNames` should be removed from the `SettingsNamesByTypeBase` registry.

If `coolNew` is not the first setting in `ExistingSettings` with the `Coolness` type, you should find the key `CoolnessTypedSettingsNames` already in the `ExistingSettingsNamesByType` type. Union `coolNew` with the existing union of strings. For example, if you see  `CoolnessTypedSettingsNames: 'oldSchool'`, change it to `CoolnessTypedSettingsNames: 'oldSchool' | 'coolNew'`.

If `coolNew` is the first setting in `ExistingSettings` with the `Coolness` type, you should expect not to find the key `CoolnessTypedSettingsNames` in the `ExistingSettingsNamesByType` type, and you will have to add it (it can be copied and pasted from the `SettingsNamesByTypeBase` in `pattern/types.ts`). 

If `coolNew` is not only the first setting in `ExistingSettings` with the `Coolness` type, but the first setting in any settings module with the `Coolness` type, see below for how to [add a new type to the settings infrastructure](#adding a new type).

## adding a new settings module at the top level

Make a copy of `app/settings/settingsTemplate.ts` and name it `pattern/mynewthing/mynewthingSettings.ts`.

### `pattern/mynewthing/mynewthingSettings.ts`:

1) String replace `template` with `new`, `Template` with `New`, and `TEMPLATE` with `NEW`. 
2) The `exampleSetting` is just there to illustrate the pattern to follow. Replace it, following the process as described in the earlier section on [adding a setting to an existing module](#adding a new setting to an existing settings module) for each of `newSettings`'s settings.
3) Clean up unused `...TypedSettingsNames` in the `...SettingsNamesByType` type.

### `defaults.ts`:

Register your new settings module in the `DEFAULT_BASE_PATTERN`.

### `pattern/index.ts`:

You probably want to export it from from the `pattern` module.

### `pattern/types.ts`:

1) Register `newSettings` on the `BasePattern` interface.
2) Add an entry to the `SettingsNamesToTypesMap` to map `NewSettingsName` to `NewSettings`.
3) Register `newSettings` on the `PatternFunctions` interface.
4) Add an entry to the `SetPatternStateForTest` interface, further overloading the signature of methods which implement it such that they can set `NewSettings` onto the `NewSettingsName` key.
5) Add `NewSettingsNamesByType` to the `SettingsNamesByType` union.

## Adding a whole new settings module that is a submodule of an existing one`

Begin by following the same steps as in [adding a new one at the top level](#adding a new settings module at the top level), but only the ones for the module itself (i.e. do not add to the top-level defaults or types modules).

### then, in the immediate parent module, `existingSettings`

1) Add `submoduleOfExistingSettings` to the `ExistingSettings` interface. Its type should be `Partial<SubmoduleOfExistingSettings>`.

2) Register `submoduleOfExistingSettings` on the `DEFAULT_EXISTING_SETTINGS` (with the same defaults as are set in `submoduleOfExistingSettings.ts`, of course; you can import them here)

3) Pass the `SubmoduleOfExampleSettingsNamesByType` up through the `ExampleSettingsNamesByType` by unioning `ExampleSettingsNamesByType` with them. Otherwise we'd have to treat this new settings module like a new one directly off the `BasePattern` with respect to registering it in all the places in `pattern/types.ts`, and that's a whole lot more work than just doing this, and this is cleaner.

4) If `submoduleOfExistingSettings` is not the first settings submodule of `existingSettings`, then you should see that `ExistingSettingsFunctions` is already the result of an `Overwrite` lookup type. If `submoduleOfExistingSettings` is indeed the first settings submodule of `existingSettings`, then you will have to set up this `Overwrite`ing.

    This is done because we need the `submoduleOfExistingSettings` property not to be a function of a previous `submoduleOfExistingSettings` state to a new state, but rather a container of functions for each of its properties from their previous states to new states (the `callFunctionsPerSetting` method recursively crawls the settings tree looking for such functions to call). So, replace the `ExistingSettingsFunctions` with `Overwrite<FunctionsOf<StripePositionSettings>, {`, opening braces for an anonymous type, in which you should add the property `submoduleOfExistingSettings: SubmoduleOfExistingSettingsFunctions`. 

    You will also have to add `[_: string]: any,` to the anonymous overwriting type to allow these properties to exist.

    Of course if the `Overwrite` already exists, you can simply add to it.

## adding a new type

If you add a setting and it is the first of its type, lets say `Coolness`, you will need to do a few extra things.

### `pattern/types.ts`:

1) Add a `CoolnessTypedSettingsNames` property to the `SettingsNamesByTypeBase` in `pattern/types.ts`.
2) Add an entry to the `SettingsNamesToTypesMap` to map all `CoolnessTypedSettingsNames` to `Coolness`.
3) Add an entry to the `SetPatternStateForTest` interface, further overloading the signature of methods which implement it such that they can set `Coolness`es onto any key in the `CoolnessTypedSettingsNames` union.

### `app/settings/settingsTemplate.ts`:

Add `CoolnessTypedSettingsNames` to the `TemplateSettingsNamesByType` for the convenience next time you add a new settings module.
