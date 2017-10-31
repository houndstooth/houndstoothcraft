import { BasePattern, Effect, PatternFunctions } from '../store'
import { composePatterns } from './composePatterns'

const combineHoundstoothEffects: (_: { houndstoothEffects: Effect[] }) => Effect =
	({ houndstoothEffects }: { houndstoothEffects: Effect[] }): Effect => {
		const basePattern: Partial<BasePattern> = {}
		const layersPattern: PatternFunctions = {}
		const animationsPattern: PatternFunctions = {}

		houndstoothEffects.forEach((houndstoothEffect: Effect): void => {
			composePatterns({
				patternToBeMergedOnto: basePattern,
				patternToMerge: houndstoothEffect.basePattern,
				warnAboutConflicts: true,
			})
			composePatterns({
				patternToBeMergedOnto: layersPattern,
				patternToMerge: houndstoothEffect.layersPattern,
				warnAboutConflicts: true,
			})
			composePatterns({
				patternToBeMergedOnto: animationsPattern,
				patternToMerge: houndstoothEffect.animationsPattern,
				warnAboutConflicts: true,
			})
		})

		return { basePattern, layersPattern, animationsPattern }
	}

export { combineHoundstoothEffects }
