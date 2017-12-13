import {
	appState,
	codeUtilities,
	DEFAULT_APP_STATE,
	DEFAULT_PATTERN_STATE,
	patternState,
} from '../../src/indexForTest'

const resetAppAndPatternStates: () => void =
	(): void => {
		codeUtilities.changeObjectIntoCopy({
			objectToChange: patternState,
			objectWithProperties: codeUtilities.deepClone(DEFAULT_PATTERN_STATE),
		})
		codeUtilities.changeObjectIntoCopy({
			objectToChange: appState,
			objectWithProperties: codeUtilities.deepClone(DEFAULT_APP_STATE),
		})
	}

export default resetAppAndPatternStates
