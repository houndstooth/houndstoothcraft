import saveFrame from '../../../../src/animation/saveFrame'
import * as saveBlob from '../../../../src/animation/saveBlob'
import state from '../../../../src/state'

describe('save frame', () => {
	const result = {} as Blob
	beforeEach(() => {
		state.lastSavedAnimationFrame = 666
		spyOn(saveBlob, 'default')

		saveFrame(result)
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(saveBlob.default).toHaveBeenCalledWith({ blob: result, name: '666.png' })
	})

	it('increments the last saved frame', () => {
		expect(state.lastSavedAnimationFrame).toBe(667)
	})
})
