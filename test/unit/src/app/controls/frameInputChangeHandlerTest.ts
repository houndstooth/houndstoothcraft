import {
	clearMixedDownContext,
	executeSelectedHoundstoothEffects,
	frameInputChangeHandler,
	state,
	to,
} from '../../../../../src'

const subject: (event: Event) => void = frameInputChangeHandler.default

describe('frame input change handler', () => {
	it('sets the current frame', () => {
		spyOn(clearMixedDownContext, 'default')
		spyOn(executeSelectedHoundstoothEffects, 'default')

		// tslint:disable-next-line:no-any
		const event: any = { target: { value: 99 }, bubbles: true }
		// tslint:disable-next-line:no-unsafe-any
		subject(event)

		expect(clearMixedDownContext.default).toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffects.default).toHaveBeenCalled()
		expect(state.controls.currentFrame).toBe(to.Frame(99))
	})
})
