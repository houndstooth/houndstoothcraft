import houndstoothHasOnlyRecognizedPatterns from './houndstoothHasOnlyRecognizedPatterns'
import composePatterns from './composePatterns'
import consoleWrapper from '../utilities/consoleWrapper'
import store from '../store'
import state from '../../state'
import combineHoundstoothEffects from './combineHoundstoothEffects'

export default ({ houndstoothEffects = [], houndstoothOverrides = {}, logComposedMainHoundstooth } = {}) => {
	const combinedHoundstoothEffects = combineHoundstoothEffects({ houndstoothEffects })

	if (unrecognizedPatternsFound({ combinedHoundstoothEffects, houndstoothOverrides })) return

	composePattern({
		patternToCompose: state.mainHoundstooth.basePattern,
		houndstoothDefaults: store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern,
		houndstoothEffects: combinedHoundstoothEffects.basePattern,
		houndstoothOverrides: houndstoothOverrides.basePattern,
	})
	composePattern({
		patternToCompose: state.mainHoundstooth.layersPattern,
		houndstoothDefaults: store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.layersPattern,
		houndstoothEffects: combinedHoundstoothEffects.layersPattern,
		houndstoothOverrides: houndstoothOverrides.layersPattern,
	})
	composePattern({
		patternToCompose: state.mainHoundstooth.animationsPattern,
		houndstoothDefaults: store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.animationsPattern,
		houndstoothEffects: combinedHoundstoothEffects.animationsPattern,
		houndstoothOverrides: houndstoothOverrides.animationsPattern,
	})

	if (logComposedMainHoundstooth) consoleWrapper.log(state.mainHoundstooth)
}

const unrecognizedPatternsFound = ({ combinedHoundstoothEffects, houndstoothOverrides }) => {
	if (!houndstoothHasOnlyRecognizedPatterns(state.mainHoundstooth)) return true
	if (!houndstoothHasOnlyRecognizedPatterns(store.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS)) return true
	if (!combinedHoundstoothEffects) return true
	if (!houndstoothHasOnlyRecognizedPatterns(houndstoothOverrides)) return true
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