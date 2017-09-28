import saveFrame from '../../../../src/animation/saveFrame'
import fileSaver from 'file-saver'
import state from '../../../../src/state'

describe('save frame', () => {
	const mockBlob = {}
	beforeEach(() => {
		state.lastSavedAnimationFrame = 666
		fileSaver.saveAs = jasmine.createSpy()

		saveFrame(mockBlob)
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(fileSaver.saveAs).toHaveBeenCalledWith(mockBlob, '666.png')
	})

	it('increments the last saved frame', () => {
		expect(state.lastSavedAnimationFrame).toBe(667)
	})
})
