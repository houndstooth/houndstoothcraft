import exportFrame from '../../../src/animation/exportFrame'
import fileSaver from 'file-saver'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import setupCanvases from '../../../src/application/setupCanvases'
import setupContexts from '../../../src/application/setupContexts'
import setupMixedDownCanvas from '../../../src/render/setupMixedDownCanvas'

describe('export frame', () => {
	beforeEach(() => {
		resetStore(store)
		setupCanvases()
		setupMixedDownCanvas()
		setupContexts()

		store.lastSavedAnimationFrame = 666
		spyOn(store.mixedDownCanvas, 'toBlob').and.callFake(callTheFunctionThrough => callTheFunctionThrough())
		spyOn(fileSaver, 'saveAs')

		exportFrame()
	})

	it('calls toBlob on the mixed down canvas', () => {
		expect(store.mixedDownCanvas.toBlob).toHaveBeenCalled()
	})

	it('saves the frame as a png with the frame number as file name', () => {
		expect(fileSaver.saveAs.calls.all()[ 0 ].args[ 1 ]).toBe('666.png')
	})

	it('increments the last saved frame', () => {
		expect(store.lastSavedAnimationFrame).toBe(667)
	})
})
