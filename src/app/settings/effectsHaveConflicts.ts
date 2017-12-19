import { Effect } from '../../types'
import { to } from '../../utilities'
import patternsHaveConflicts from './patternsHaveConflicts'

const effectsHaveConflicts: (_: {effect: Effect, effectCheckingAgainst: Effect }) => boolean =
	({ effect, effectCheckingAgainst }: {effect: Effect, effectCheckingAgainst: Effect }): boolean => {
		if (patternsHaveConflicts({
				pattern: effect.animationsPattern,
				patternCheckingAgainst: effectCheckingAgainst.animationsPattern,
				patternName: to.SettingStep('animationsPattern'),
			})) {
			return true
		}

		if (patternsHaveConflicts({
				pattern: effect.layersPattern,
				patternCheckingAgainst: effectCheckingAgainst.layersPattern,
				patternName: to.SettingStep('layersPattern'),
			})) {
			return true
		}

		return patternsHaveConflicts({
			pattern: effect.basePattern,
			patternCheckingAgainst: effectCheckingAgainst.basePattern,
			patternName: to.SettingStep('basePattern'),
		})
	}

export default effectsHaveConflicts
