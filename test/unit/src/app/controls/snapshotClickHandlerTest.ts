import { exportCanvas, mixDownContexts, snapshotClickHandler } from '../../../../../src'

describe('snapshot click handler', () => {
	beforeEach(() => {
		spyOn(mixDownContexts, 'default')
		spyOn(exportCanvas, 'default')

		snapshotClickHandler.default()
	})

	it('mixes down the canvases', () => {
		expect(mixDownContexts.default).toHaveBeenCalled()
	})

	it('exports the current frame', () => {
		snapshotClickHandler.default()

		expect(exportCanvas.default).toHaveBeenCalled()
	})
})
