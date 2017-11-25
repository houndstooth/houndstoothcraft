import { exportFrame, mixDownContexts, snapshotClickHandler } from '../../../../../src'

describe('snapshot click handler', () => {
	beforeEach(() => {
		spyOn(mixDownContexts, 'main')
		spyOn(exportFrame, 'main')

		snapshotClickHandler.main()
	})

	it('mixes down the canvases', () => {
		expect(mixDownContexts.main).toHaveBeenCalled()
	})

	it('exports the current frame', () => {
		snapshotClickHandler.main()

		expect(exportFrame.main).toHaveBeenCalled()
	})
})
