import exportFrame from '../../src/application/exportFrame'
import fileSaver from 'file-saver'
import canvas from '../../src/render/canvas'

describe('export frame', () => {
	beforeEach(() => {
		current.lastSavedAnimationFrame = 666
		spyOn(canvas, 'toBlob').and.callFake(fn => fn())
		spyOn(fileSaver, 'saveAs')

		exportFrame()
	})

	it('calls toBlob on the canvas', () => {
		expect(canvas.toBlob).toHaveBeenCalled()
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(fileSaver.saveAs.calls.all()[0].args[1]).toBe('666.png')
	})

	it('increments the last saved frame', () => {
		expect(current.lastSavedAnimationFrame).toBe(667)
	})
})
