import { appState, codeUtilities, defaults, patternState } from '../../src'

const resetAppAndPatternStates: () => void =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: appState,
			objectWithProperties: defaults.DEFAULT_APP_STATE,
		})
		codeUtilities.changeObjectIntoCopy({
			objectToChange: patternState,
			objectWithProperties: {},
		})
	}

export default resetAppAndPatternStates
