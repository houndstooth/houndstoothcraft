import {
	appState,
	clearMixedDownContext,
	executeEffect,
	overrideInputHandler,
	updateOverrideLeafNode,
} from '../../../../../../src/indexForTest'
import { createMockEvent } from '../../../../helpers'

describe('override input handler', () => {
	let subject: (_: Event) => void
	beforeEach(() => {
		subject = overrideInputHandler.default

		spyOn(clearMixedDownContext, 'default')
		spyOn(executeEffect, 'default')
		spyOn(updateOverrideLeafNode, 'default')

		const event: Event = createMockEvent({
			target: {
				parentNode: { id: 'basePattern-colorSettings-opacity' },
				value: '0.3',
			},
		})

		subject(event)
	})

	it('updates the corresponding override', () => {
		if (appState.settings.overrides.basePattern && appState.settings.overrides.basePattern.colorSettings) {
			expect(appState.settings.overrides.basePattern.colorSettings.opacity).toBe(0.3)
		}
		else {
			fail()
		}
	})

	it('clears the mixed down canvas', () => {
		expect(clearMixedDownContext.default).toHaveBeenCalled()
	})

	it('executes the selected effect', () => {
		expect(executeEffect.default).toHaveBeenCalled()
	})

	it('handles functions', () => {
		const functionEvent: Event = createMockEvent({
			target: {
				parentNode: {
					id: 'basePattern-colorSettings-opacity',

				},
				value: 'function (t) { return Math.random() * t > 10; }',
			},
		})

		subject(functionEvent)

		if (appState.settings.overrides.basePattern &&
			appState.settings.overrides.basePattern.colorSettings &&
			appState.settings.overrides.basePattern.colorSettings.opacity) {
			const actual: string = appState.settings.overrides.basePattern.colorSettings.opacity.toString()
			expect(actual).toBe('function (t) { return Math.random() * t > 10; }')
		}
		else {
			fail()
		}
	})

	it('handles garbage', () => {
		const functionEvent: Event = createMockEvent({
			target: {
				parentNode: {
					id: 'basePattern-colorSettings-opacity',
				},
				value: 'function (t) { return Math.random() * t > ',
			},
		})

		subject(functionEvent)

		if (appState.settings.overrides.basePattern && appState.settings.overrides.basePattern.colorSettings) {
			expect(appState.settings.overrides.basePattern.colorSettings.opacity).toBe(undefined)
		}
		else {
			fail()
		}
	})
})
