import {
	appState,
	clearMixedDownContext,
	executeSelectedEffects,
	frameInputChangeHandler,
	to,
} from '../../../../../src/indexForTest'

describe('frame input change handler', () => {
	let subject: (event: Event) => void
	beforeEach(() => {
		subject = frameInputChangeHandler.default
	})

	it('sets the current frame', () => {
		spyOn(clearMixedDownContext, 'default')
		spyOn(executeSelectedEffects, 'default')

		// tslint:disable-next-line:no-any
		const event: any = { target: { value: 99 } }
		// tslint:disable-next-line:no-unsafe-any
		subject(event)

		expect(clearMixedDownContext.default).toHaveBeenCalled()
		expect(executeSelectedEffects.default).toHaveBeenCalled()
		expect(appState.controls.currentFrame).toBe(to.Frame(99))
	})
})
