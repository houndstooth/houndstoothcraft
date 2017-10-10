import { console } from '../utilities/windowWrapper'
import { defaults } from '../store'
import state from '../state'
import combineHoundstoothEffects from './combineHoundstoothEffects'
import composePatterns from './composePatterns'
import houndstoothHasOnlyRecognizedPatterns from './houndstoothHasOnlyRecognizedPatterns'

const composeMainHoundstooth = ({
	houndstoothEffects = [],
	houndstoothOverrides = {},
	logComposedMainHoundstooth,
}: {
	houndstoothEffects?,
	houndstoothOverrides?,
	logComposedMainHoundstooth?,
	} = {}) => {
	const combinedHoundstoothEffects = combineHoundstoothEffects({ houndstoothEffects })

	if (unrecognizedPatternsFound({ combinedHoundstoothEffects, houndstoothOverrides })) {
		return
	}

	composePattern({
		patternToCompose: state.mainHoundstooth.basePattern,
		houndstoothDefaults: defaults.DEFAULT_HOUNDSTOOTH.basePattern,
		houndstoothEffects: combinedHoundstoothEffects.basePattern,
		houndstoothOverrides: houndstoothOverrides.basePattern,
	})
	composePattern({
		patternToCompose: state.mainHoundstooth.layersPattern,
		houndstoothDefaults: defaults.DEFAULT_HOUNDSTOOTH.layersPattern,
		houndstoothEffects: combinedHoundstoothEffects.layersPattern,
		houndstoothOverrides: houndstoothOverrides.layersPattern,
	})
	composePattern({
		patternToCompose: state.mainHoundstooth.animationsPattern,
		houndstoothDefaults: defaults.DEFAULT_HOUNDSTOOTH.animationsPattern,
		houndstoothEffects: combinedHoundstoothEffects.animationsPattern,
		houndstoothOverrides: houndstoothOverrides.animationsPattern,
	})

	if (logComposedMainHoundstooth) {
		console.log(state.mainHoundstooth)
	}
}

const unrecognizedPatternsFound = ({ combinedHoundstoothEffects, houndstoothOverrides }) => {
	if (!houndstoothHasOnlyRecognizedPatterns(state.mainHoundstooth)) {
		return true
	}
	if (!houndstoothHasOnlyRecognizedPatterns(defaults.DEFAULT_HOUNDSTOOTH)) {
		return true
	}
	if (!combinedHoundstoothEffects) {
		return true
	}
	if (!houndstoothHasOnlyRecognizedPatterns(houndstoothOverrides)) {
		return true
	}
	return false
}

const composePattern = ({ patternToCompose, houndstoothDefaults, houndstoothEffects, houndstoothOverrides }) => {
	composePatterns({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothDefaults,
	})
	composePatterns({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothEffects,
	})
	composePatterns({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothOverrides,
	})
}

export default composeMainHoundstooth
