import { appState, codeUtilities, defaults, NullarySideEffector, patternState } from '../../src/indexForTest'

const resetAppAndPatternStates: NullarySideEffector =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: appState,
			objectWithProperties: defaults.DEFAULT_APP_STATE,
		})
		codeUtilities.changeObjectIntoCopy({
			objectToChange: patternState.get(),
			objectWithProperties: {},
		})
	}

export default resetAppAndPatternStates
