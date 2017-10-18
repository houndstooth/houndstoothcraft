import * as saveBlob from '../../../../src/animation/saveBlob'
import { saveFrame } from '../../../../src/animation/saveFrame'
import { state } from '../../../../src/state'

describe('save frame', () => {
	const result = {}
	beforeEach(() => {
		state.lastSavedAnimationFrame = 666
		spyOn(saveBlob, 'saveBlob')

		saveFrame(result)
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(saveBlob.saveBlob).toHaveBeenCalledWith({ blob: result, name: '666.png' })
	})

	it('increments the last saved frame', () => {
		expect(state.lastSavedAnimationFrame).toBe(667)
	})
})
