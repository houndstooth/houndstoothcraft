import exportFrame from '../../../src/application/exportFrame'
import fileSaver from 'file-saver'
import canvas from '../../../src/render/canvas'
import store from '../../../store'
import codeUtilities from '../../../src/utilities/codeUtilities'
import initialState from '../../../src/state/initialState'

describe('export frame', () => {
	beforeEach(() => {
		store.currentState = codeUtilities.deepClone(initialState.INITIAL_STATE)
		store.currentState.lastSavedAnimationFrame = 666
		spyOn(canvas, 'toBlob').and.callFake(
			callTheFunctionThrough => callTheFunctionThrough()
		)
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
		expect(store.currentState.lastSavedAnimationFrame).toBe(667)
	})
})
