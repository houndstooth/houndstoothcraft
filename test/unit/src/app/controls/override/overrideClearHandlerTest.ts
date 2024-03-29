import {
	appState,
	clearMixedDownContext,
	enableOrDisableAnimationControls,
	executeEffect,
	overrideClearHandler,
	to,
} from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy
import { createMockElement, createMockEvent } from '../../../../helpers'

describe('override clear handler', () => {
	let subject: (_: Event) => void
	const stopPropagationSpy: Spy = jasmine.createSpy('stopPropagation')
	beforeEach(() => {
		subject = overrideClearHandler.default

		// @ts-ignore
		const event: Event = createMockEvent({
			stopPropagation: stopPropagationSpy,
			target: createMockElement({
				parentNodeId: 'basePattern-colorSettings-colorAssignmentSettings',
			}) as HTMLElement,
		})

		appState.settings.overrides = {
			basePattern: {
				colorSettings: {
					colorAssignmentSettings: {
						supertile: to.Supertile([]),
						switcheroo: true,
					},
					opacity: 0.3,
				},
			},
		}

		spyOn(clearMixedDownContext, 'default')
		spyOn(executeEffect, 'default')
		spyOn(enableOrDisableAnimationControls, 'default')

		subject(event)
	})

	it('removes all override for the corresponding setting and all of its children', () => {
		expect(appState.settings.overrides).toEqual({
			basePattern: {
				colorSettings: {
					opacity: 0.3,
				},
			},
		})
	})

	it('stops propagation to prevent triggering the handler for toggling open the parent', () => {
		expect(stopPropagationSpy).toHaveBeenCalled()
	})

	it('clears the mixed down canvas', () => {
		expect(clearMixedDownContext.default).toHaveBeenCalled()
	})

	it('executes selected houndstooth effect', () => {
		expect(executeEffect.default).toHaveBeenCalled()
	})

	it('enables or disables the animation controls', () => {
		expect(enableOrDisableAnimationControls.default).toHaveBeenCalled()
	})
})
