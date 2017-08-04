import storeUtilities from '../utilities/storeUtilities'
import consoleWrapper from '../application/consoleWrapper'
import houndstoothDefaults from './houndstoothDefaults'
import store from '../../store'
import combineHoundstoothEffects from './combineHoundstoothEffects'

export default ({ houndstoothEffects = [], houndstoothOverrides = {}, logComposedMainHoundstooth } = {}) => {
	const combinedHoundstoothEffects = combineHoundstoothEffects({ houndstoothEffects })

	if (unrecognizedPatternsFound({ combinedHoundstoothEffects, houndstoothOverrides })) return

	composePattern({
		patternToCompose: store.mainHoundstooth.basePattern,
		houndstoothDefaults: houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern,
		houndstoothEffects: combinedHoundstoothEffects.basePattern,
		houndstoothOverrides: houndstoothOverrides.basePattern,
	})
	composePattern({
		patternToCompose: store.mainHoundstooth.iterationsPattern,
		houndstoothDefaults: houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.iterationsPattern,
		houndstoothEffects: combinedHoundstoothEffects.iterationsPattern,
		houndstoothOverrides: houndstoothOverrides.iterationsPattern,
	})
	composePattern({
		patternToCompose: store.mainHoundstooth.animationsPattern,
		houndstoothDefaults: houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.animationsPattern,
		houndstoothEffects: combinedHoundstoothEffects.animationsPattern,
		houndstoothOverrides: houndstoothOverrides.animationsPattern,
	})

	if (logComposedMainHoundstooth) consoleWrapper.log(store.mainHoundstooth)
}

const unrecognizedPatternsFound = ({ combinedHoundstoothEffects, houndstoothOverrides }) => {
	if (!storeUtilities.houndstoothHasOnlyRecognizedPatterns(store.mainHoundstooth)) return true
	if (!storeUtilities.houndstoothHasOnlyRecognizedPatterns(houndstoothDefaults.HOUNDSTOOTH_DEFAULTS)) return true
	if (!combinedHoundstoothEffects) return true
	if (!storeUtilities.houndstoothHasOnlyRecognizedPatterns(houndstoothOverrides)) return true
	return false
}

const composePattern = ({ patternToCompose, houndstoothDefaults, houndstoothEffects, houndstoothOverrides }) => {
	storeUtilities.composePatterns({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothDefaults,
	})
	storeUtilities.composePatterns({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothEffects,
	})
	storeUtilities.composePatterns({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothOverrides,
	})
}
