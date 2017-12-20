import { PatternBaseValues, PatternFunctions } from '../../pattern'
import { Effect } from '../../types'
import { appState } from '../appState'
import composePatterns from './composePatterns'

const combineEffects: () => void =
	(): void => {
		const basePattern: PatternBaseValues = {}
		const layersPattern: PatternFunctions = {}
		const animationsPattern: PatternFunctions = {}

		appState.controls.selectedEffects.forEach((effect: Effect): void => {
			composePatterns({
				patternToBeMergedOnto: basePattern,
				patternToMerge: effect.basePattern,
			})
			composePatterns({
				patternToBeMergedOnto: layersPattern,
				patternToMerge: effect.layersPattern,
			})
			composePatterns({
				patternToBeMergedOnto: animationsPattern,
				patternToMerge: effect.animationsPattern,
			})
		})

		appState.settings.combinedEffects = { basePattern, layersPattern, animationsPattern }
	}

export default combineEffects
