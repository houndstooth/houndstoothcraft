import { BasePattern, Effect, PatternFunctions } from '../../pattern'
import composePatterns from './composePatterns'

const combineEffects: (_: { effects: Effect[] }) => Effect =
	({ effects }: { effects: Effect[] }): Effect => {
		const basePattern: Partial<BasePattern> = {}
		const layersPattern: PatternFunctions = {}
		const animationsPattern: PatternFunctions = {}

		effects.forEach((effect: Effect): void => {
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
