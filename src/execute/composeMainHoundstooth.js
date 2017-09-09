import houndstoothHasOnlyRecognizedPatterns from './houndstoothHasOnlyRecognizedPatterns'
import composePatterns from './composePatterns'
import consoleWrapper from '../utilities/consoleWrapper'
import storeStuff from '../store'
import store from '../../store'
import combineHoundstoothEffects from './combineHoundstoothEffects'

export default ({ houndstoothEffects = [], houndstoothOverrides = {}, logComposedMainHoundstooth } = {}) => {
	const combinedHoundstoothEffects = combineHoundstoothEffects({ houndstoothEffects })

	if (unrecognizedPatternsFound({ combinedHoundstoothEffects, houndstoothOverrides })) return

	composePattern({
		patternToCompose: store.mainHoundstooth.basePattern,
		houndstoothDefaults: storeStuff.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern,
		houndstoothEffects: combinedHoundstoothEffects.basePattern,
		houndstoothOverrides: houndstoothOverrides.basePattern,
	})
	composePattern({
		patternToCompose: store.mainHoundstooth.layersPattern,
		houndstoothDefaults: storeStuff.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.layersPattern,
		houndstoothEffects: combinedHoundstoothEffects.layersPattern,
		houndstoothOverrides: houndstoothOverrides.layersPattern,
	})
	composePattern({
		patternToCompose: store.mainHoundstooth.animationsPattern,
		houndstoothDefaults: storeStuff.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.animationsPattern,
		houndstoothEffects: combinedHoundstoothEffects.animationsPattern,
		houndstoothOverrides: houndstoothOverrides.animationsPattern,
	})

	if (logComposedMainHoundstooth) consoleWrapper.log(store.mainHoundstooth)
}

const unrecognizedPatternsFound = ({ combinedHoundstoothEffects, houndstoothOverrides }) => {
	if (!houndstoothHasOnlyRecognizedPatterns(store.mainHoundstooth)) return true
	if (!houndstoothHasOnlyRecognizedPatterns(storeStuff.houndstoothDefaults.HOUNDSTOOTH_DEFAULTS)) return true
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
