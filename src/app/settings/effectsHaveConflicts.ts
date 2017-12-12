import { Effect } from '../../types'
import patternsHaveConflicts from './patternsHaveConflicts'

const effectsHaveConflicts: (_: {effect: Effect, effectCheckingAgainst: Effect }) => boolean =
	({ effect, effectCheckingAgainst }: {effect: Effect, effectCheckingAgainst: Effect }): boolean => {
		if (patternsHaveConflicts({
				pattern: effect.animationsPattern,
				patternCheckingAgainst: effectCheckingAgainst.animationsPattern,
			})) {
			return true
		}

		if (patternsHaveConflicts({
				pattern: effect.layersPattern,
				patternCheckingAgainst: effectCheckingAgainst.layersPattern,
			})) {
			return true
		}

		return patternsHaveConflicts({
			pattern: effect.basePattern,
			patternCheckingAgainst: effectCheckingAgainst.basePattern,
		})
	}

export default effectsHaveConflicts
