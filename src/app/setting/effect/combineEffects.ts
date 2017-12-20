import { PatternBaseValues, PatternFunctions } from '../../../pattern'
import { Effect } from '../../../types'
import { appState } from '../../appState'
import { composePatterns } from '../pattern'

const combineEffects: () => void =
	(): void => {
		const basePattern: PatternBaseValues = {}
		const layersPattern: PatternFunctions = {}
		const animationsPattern: PatternFunctions = {}

		appState.controls.selectedEffects.forEach((effectName: string): void => {
			const effect: Effect = appState.settings.availableEffects[effectName]
			composePatterns.default({
				patternToBeMergedOnto: basePattern,
				patternToMerge: effect.basePattern,
			})
			composePatterns.default({
				patternToBeMergedOnto: layersPattern,
				patternToMerge: effect.layersPattern,
			})
			composePatterns.default({
				patternToBeMergedOnto: animationsPattern,
				patternToMerge: effect.animationsPattern,
			})
		})

		appState.settings.combinedEffects = { basePattern, layersPattern, animationsPattern }
	}

export default combineEffects
