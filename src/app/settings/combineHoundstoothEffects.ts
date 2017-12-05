import { BasePattern, Effect, PatternFunctions } from '../../pattern'
import composePatterns from './composePatterns'

const combineHoundstoothEffects: (_: { houndstoothEffects: Effect[] }) => Effect =
	({ houndstoothEffects }: { houndstoothEffects: Effect[] }): Effect => {
		const basePattern: Partial<BasePattern> = {}
		const layersPattern: PatternFunctions = {}
		const animationsPattern: PatternFunctions = {}

		houndstoothEffects.forEach((houndstoothEffect: Effect): void => {
			composePatterns({
				patternToBeMergedOnto: basePattern,
				patternToMerge: houndstoothEffect.basePattern,
			})
			composePatterns({
				patternToBeMergedOnto: layersPattern,
				patternToMerge: houndstoothEffect.layersPattern,
			})
			composePatterns({
				patternToBeMergedOnto: animationsPattern,
				patternToMerge: houndstoothEffect.animationsPattern,
			})
		})

		return { basePattern, layersPattern, animationsPattern }
	}

export default combineHoundstoothEffects
