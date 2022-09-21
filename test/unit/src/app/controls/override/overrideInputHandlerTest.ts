import {
	appState,
	clearMixedDownContext,
	executeEffect,
	overrideInputHandler,
	updateOverrideLeafNode,
} from '../../../../../../src/indexForTest'
import { createMockElement, createMockEvent } from '../../../../helpers'

describe('override input handler', () => {
	let subject: (_: Event) => void
	beforeEach(() => {
		subject = overrideInputHandler.default

		spyOn(clearMixedDownContext, 'default')
		spyOn(executeEffect, 'default')
		spyOn(updateOverrideLeafNode, 'default')

		// @ts-ignore
		const event: Event = createMockEvent({
			target: createMockElement({
				parentNodeId: 'basePattern-colorSettings-opacity',
				value: '0.3',
			}) as HTMLInputElement,
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
		// @ts-ignore
		const functionEvent: Event = createMockEvent({
			target: createMockElement({
				parentNodeId: 'basePattern-colorSettings-opacity',
				value: 'function (t) { return Math.random() * t > 10; }',
			}) as HTMLInputElement,
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
		// @ts-ignore
		const functionEvent: Event = createMockEvent({
			target: createMockElement({
				parentNodeId: 'basePattern-colorSettings-opacity',
				value: 'function (t) { return Math.random() * t > ',
			}) as HTMLInputElement,
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
