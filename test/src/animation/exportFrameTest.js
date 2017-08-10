import exportFrame from '../../../src/animation/exportFrame'
import fileSaver from 'file-saver'
import canvas from '../../../src/interface/canvas'
import store from '../../../store'
import resetStore from '../../helpers/resetStore'

describe('export frame', () => {
	beforeEach(() => {
		resetStore(store)
		store.lastSavedAnimationFrame = 666
		spyOn(canvas, 'toBlob').and.callFake(callTheFunctionThrough => callTheFunctionThrough())
		spyOn(fileSaver, 'saveAs')

		exportFrame()
	})

	it('calls toBlob on the canvas', () => {
		expect(canvas.toBlob).toHaveBeenCalled()
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(fileSaver.saveAs.calls.all()[ 0 ].args[ 1 ]).toBe('666.png')
	})

	it('increments the last saved frame', () => {
		expect(store.lastSavedAnimationFrame).toBe(667)
	})
})
