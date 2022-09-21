import {
	appState,
	clearMixedDownContext,
	executeEffect,
	frameInputHandler,
	to,
} from '../../../../../../src/indexForTest'
import { createMockElement, createMockEvent } from '../../../../helpers'

describe('frame input handler', () => {
	let subject: (event: Event) => void
	beforeEach(() => {
		subject = frameInputHandler.default
	})

	it('sets the current frame', () => {
		spyOn(clearMixedDownContext, 'default')
		spyOn(executeEffect, 'default')

		// @ts-ignore
		const event: Event = createMockEvent({ target: createMockElement({ value: '99' }) as HTMLInputElement })
		subject(event)

		expect(clearMixedDownContext.default).toHaveBeenCalled()
		expect(executeEffect.default).toHaveBeenCalled()
		expect(appState.controls.currentFrame).toBe(to.Frame(99))
	})
})
