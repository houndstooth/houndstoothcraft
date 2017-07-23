import stateUtilities from '../utilities/stateUtilities'
import consoleWrapper from '../application/consoleWrapper'
import houndstoothDefaults from './houndstoothDefaults'
import store from '../../store'

export default ({ houndstoothEffects = [], houndstoothOverrides = {}, logComposedMainHoundstooth } = {}) => {
	const combinedHoundstoothEffects = combineHoundstoothEffects({ houndstoothEffects })

	if (
		!combinedHoundstoothEffects ||
		!stateUtilities.confirmHoundstoothHasNoUnrecognizedPatterns(store.currentState.mainHoundstooth) ||
		!stateUtilities.confirmHoundstoothHasNoUnrecognizedPatterns(houndstoothOverrides) ||
		!stateUtilities.confirmHoundstoothHasNoUnrecognizedPatterns(houndstoothDefaults.HOUNDSTOOTH_DEFAULTS)
	) {
		return
	}

	composePattern({
		patternToCompose: store.currentState.mainHoundstooth.basePattern,
		houndstoothDefaults: houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.basePattern,
		houndstoothEffects: combinedHoundstoothEffects.basePattern,
		houndstoothOverrides: houndstoothOverrides.basePattern,
	})
	composePattern({
		patternToCompose: store.currentState.mainHoundstooth.iterationsPattern,
		houndstoothDefaults: houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.iterationsPattern,
		houndstoothEffects: combinedHoundstoothEffects.iterationsPattern,
		houndstoothOverrides: houndstoothOverrides.iterationsPattern,
	})
	composePattern({
		patternToCompose: store.currentState.mainHoundstooth.animationsPattern,
		houndstoothDefaults: houndstoothDefaults.HOUNDSTOOTH_DEFAULTS.animationsPattern,
		houndstoothEffects: combinedHoundstoothEffects.animationsPattern,
		houndstoothOverrides: houndstoothOverrides.animationsPattern,
	})

	if (logComposedMainHoundstooth) consoleWrapper.log(store.currentState.mainHoundstooth)
}

const composePattern = ({ patternToCompose, houndstoothDefaults, houndstoothEffects, houndstoothOverrides }) => {
	stateUtilities.mergePatterns({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothDefaults,
	})
	stateUtilities.mergePatterns({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothEffects,
	})
	stateUtilities.mergePatterns({
		patternToBeMergedOnto: patternToCompose,
		patternToMerge: houndstoothOverrides,
	})
}

const combineHoundstoothEffects = ({ houndstoothEffects }) => {
	const basePattern = {}
	const iterationsPattern = {}
	const animationsPattern = {}

	const { mergePatterns, confirmHoundstoothHasNoUnrecognizedPatterns } = stateUtilities

	let anyIssues = false
	houndstoothEffects.forEach(houndstoothEffect => {
		if (!confirmHoundstoothHasNoUnrecognizedPatterns(houndstoothEffect)) {
			anyIssues = true
			return
		}
		mergePatterns({
			patternToBeMergedOnto: basePattern,
			patternToMerge: houndstoothEffect.basePattern,
		})
		mergePatterns({
			patternToBeMergedOnto: iterationsPattern,
			patternToMerge: houndstoothEffect.iterationsPattern,
		})
		mergePatterns({
			patternToBeMergedOnto: animationsPattern,
			patternToMerge: houndstoothEffect.animationsPattern,
		})
	})

	if (anyIssues) {
		return null
	}
	return { basePattern, iterationsPattern, animationsPattern }
}
