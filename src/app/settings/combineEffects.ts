import { PatternBaseValues, PatternFunctions } from '../../pattern'
import { Effect } from '../../types'
import { appState } from '../appState'
import composePatterns from './composePatterns'

const combineEffects: () => Effect =
	(): Effect => {
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

		return { basePattern, layersPattern, animationsPattern }
	}

export default combineEffects
