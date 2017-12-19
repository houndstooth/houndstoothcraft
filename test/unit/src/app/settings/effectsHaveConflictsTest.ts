import { Effect, effectsHaveConflicts, patternsHaveConflicts, to } from '../../../../../src/indexForTest'

describe('effects have conflicts', () => {
	let subject: (_: {effect: Effect, effectCheckingAgainst: Effect }) => boolean
	beforeEach(() => {
		subject = effectsHaveConflicts.default
	})

	it('returns false if there no conflicts on the animations, layers, and base patterns', () => {
		const effect: Effect = {
			animationsPattern: {
				colorSettings: {
					opacity: (): number => 0.5,
				},
			},
			basePattern: {
				gridSettings: {
					includeNegativeQuadrants: true,
				},
			},
			layersPattern: {
				viewSettings: {
					zoom: (): number => 5,
				},
			},
		}
		const effectCheckingAgainst: Effect = {
			animationsPattern: {
				colorSettings: {
					opacity: (): number => 0.5,
				},
			},
			basePattern: {
				gridSettings: {
					tileResolution: 4,
				},
			},
			layersPattern: {
				animationSettings: {
					refreshCanvas: (): boolean => false,
				},
			},
		}

		expect(subject({ effect, effectCheckingAgainst })).toBe(false)
	})

	it('returns true if there is a conflict on the animations pattern', () => {
		const effect: Effect = {
			animationsPattern: {
				colorSettings: {
					opacity: (): number => 0.5,
				},
			},
		}
		const effectCheckingAgainst: Effect = {
			animationsPattern: {
				colorSettings: {
					opacity: (): number => 1,
				},
			},
		}

		expect(subject({ effect, effectCheckingAgainst })).toBe(true)
	})

	it('returns true if there is a conflict on the base pattern', () => {
		const effect: Effect = {
			basePattern: {
				gridSettings: {
					includeNegativeQuadrants: true,
				},
			},
		}
		const effectCheckingAgainst: Effect = {
			basePattern: {
				gridSettings: {
					includeNegativeQuadrants: false,
				},
			},
		}

		expect(subject({ effect, effectCheckingAgainst })).toBe(true)
	})

	it('returns true if there is a conflict on the layers pattern', () => {
		const effect: Effect = {
			layersPattern: {
				animationSettings: {
					refreshCanvas: (): boolean => true,
				},
			},
		}
		const effectCheckingAgainst: Effect = {
			layersPattern: {
				animationSettings: {
					refreshCanvas: (): boolean => false,
				},
			},
		}

		expect(subject({ effect, effectCheckingAgainst })).toBe(true)
	})

	it('gives the pattern name, so if there are conflicts to warn about, it has it', () => {
		const effect: Effect = {
			animationsPattern: {
				colorSettings: {
					opacity: (): number => 0.5,
				},
			},
			basePattern: {
				gridSettings: {
					includeNegativeQuadrants: true,
				},
			},
			layersPattern: {
				viewSettings: {
					zoom: (): number => 5,
				},
			},
		}
		const effectCheckingAgainst: Effect = {
			animationsPattern: {
				colorSettings: {
					opacity: (): number => 0.5,
				},
			},
			basePattern: {
				gridSettings: {
					tileResolution: 4,
				},
			},
			layersPattern: {
				animationSettings: {
					refreshCanvas: (): boolean => false,
				},
			},
		}
		spyOn(patternsHaveConflicts, 'default')

		subject({ effect, effectCheckingAgainst })

		expect(patternsHaveConflicts.default).toHaveBeenCalledWith({
			pattern: effect.animationsPattern,
			patternCheckingAgainst: effectCheckingAgainst.animationsPattern,
			patternName: to.SettingStep('animationsPattern'),
		})
		expect(patternsHaveConflicts.default).toHaveBeenCalledWith({
			pattern: effect.basePattern,
			patternCheckingAgainst: effectCheckingAgainst.basePattern,
			patternName: to.SettingStep('basePattern'),
		})
		expect(patternsHaveConflicts.default).toHaveBeenCalledWith({
			pattern: effect.layersPattern,
			patternCheckingAgainst: effectCheckingAgainst.layersPattern,
			patternName: to.SettingStep('layersPattern'),
		})
	})
})
