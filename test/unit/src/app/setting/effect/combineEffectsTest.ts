// tslint:disable:no-unsafe-any

import { appState, combineEffects, NamedEffect } from '../../../../../../src/indexForTest'

describe('combine effect', () => {
	it('composes the base, animations, and layers patterns of every effect, and saves it on the store', () => {
		const subject: () => void = combineEffects.default

		const effectOne: NamedEffect = {
			animationsPattern: {
				gridSettings: {
					tileResolution: (): number => 1,
				},
			},
			basePattern: {
				viewSettings: {
					zoom: 1,
				},
			},
			description: '',
			layersPattern: {
				colorSettings: {
					opacity: (): number => 1,
				},
			},
			name: 'effectOne',
		}
		const effectTwo: NamedEffect = {
			animationsPattern: {
				viewSettings: {
					zoom: (): number => 2,
				},
			},
			basePattern: {
				colorSettings: {
					opacity: 2,
				},
			},
			description: '',
			layersPattern: {
				gridSettings: {
					tileResolution: (): number => 2,
				},
			},
			name: 'effectTwo',
		}
		appState.settings.availableEffects = { effectOne, effectTwo }
		appState.controls.selectedEffects = [ 'effectOne', 'effectTwo' ]

		subject()

		expect(appState.settings.combinedEffects.toString()).toEqual({
			animationsPattern: {
				gridSettings: {
					tileResolution: (): number => 1,
				},
				viewSettings: {
					zoom: (): number => 2,
				},
			},
			basePattern: {
				colorSettings: {
					opacity: 2,
				},
				viewSettings: {
					zoom: 1,
				},
			},
			layersPattern: {
				colorSettings: {
					opacity: (): number => 1,
				},
				gridSettings: {
					tileResolution: (): number => 2,
				},
			},
		}.toString())
	})
})
