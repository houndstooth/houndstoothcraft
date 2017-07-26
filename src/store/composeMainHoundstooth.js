import storeUtilities from '../utilities/storeUtilities'
import consoleWrapper from '../application/consoleWrapper'
import houndstoothDefaults from './houndstoothDefaults'
import store from '../../store'

export default ({ houndstoothEffects = [], houndstoothOverrides = {}, logComposedMainHoundstooth } = {}) => {
	const combinedHoundstoothEffects = combineHoundstoothEffects({ houndstoothEffects })

	if (
		!combinedHoundstoothEffects ||
		!storeUtilities.confirmHoundstoothHasNoUnrecognizedPatterns(store.mainHoundstooth) ||
		!storeUtilities.confirmHoundstoothHasNoUnrecognizedPatterns(houndstoothOverrides) ||
		!storeUtilities.confirmHoundstoothHasNoUnrecognizedPatterns(houndstoothDefaults.HOUNDSTOOTH_DEFAULTS)
	) {
		return
	}

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

const combineHoundstoothEffects = ({ houndstoothEffects }) => {
	const basePattern = {}
	const iterationsPattern = {}
	const animationsPattern = {}

	const { composePatterns, confirmHoundstoothHasNoUnrecognizedPatterns } = storeUtilities

	let anyIssues = false
	houndstoothEffects.forEach(houndstoothEffect => {
		if (!confirmHoundstoothHasNoUnrecognizedPatterns(houndstoothEffect)) {
			anyIssues = true
			return
		}
		composePatterns({
			patternToBeMergedOnto: basePattern,
			patternToMerge: houndstoothEffect.basePattern,
		})
		composePatterns({
			patternToBeMergedOnto: iterationsPattern,
			patternToMerge: houndstoothEffect.iterationsPattern,
		})
		composePatterns({
			patternToBeMergedOnto: animationsPattern,
			patternToMerge: houndstoothEffect.animationsPattern,
		})
	})

	if (anyIssues) {
		return null
	}
	return { basePattern, iterationsPattern, animationsPattern }
}
