import { exportCanvas, mixDownContexts, snapshotClickHandler } from '../../../../../src'

describe('snapshot click handler', () => {
	beforeEach(() => {
		spyOn(mixDownContexts, 'main')
		spyOn(exportCanvas, 'main')

		snapshotClickHandler.main()
	})

	it('mixes down the canvases', () => {
		expect(mixDownContexts.main).toHaveBeenCalled()
	})

	it('exports the current frame', () => {
		snapshotClickHandler.main()

		expect(exportCanvas.main).toHaveBeenCalled()
	})
})
