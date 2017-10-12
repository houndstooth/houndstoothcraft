import saveFrame from '../../../../src/animation/saveFrame'
import * as saveBlob from '../../../../src/animation/saveBlob'
import state from '../../../../src/state'

describe('save frame', () => {
	const blob = {} as Blob
	beforeEach(() => {
		state.lastSavedAnimationFrame = 666
		spyOn(saveBlob, 'default')

		saveFrame({ blob })
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(saveBlob.default).toHaveBeenCalledWith({ blob, name: '666.png' })
	})

	it('increments the last saved frame', () => {
		expect(state.lastSavedAnimationFrame).toBe(667)
	})
})
