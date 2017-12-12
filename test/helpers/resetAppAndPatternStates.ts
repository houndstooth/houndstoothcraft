import { appState, codeUtilities, DEFAULT_APP_STATE, NullarySideEffector, patternState } from '../../src/indexForTest'

const resetAppAndPatternStates: NullarySideEffector =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: appState,
			objectWithProperties: DEFAULT_APP_STATE,
		})
		codeUtilities.changeObjectIntoCopy({
			objectToChange: patternState.get(),
			objectWithProperties: {},
		})
	}

export default resetAppAndPatternStates
