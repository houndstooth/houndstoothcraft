import { mixDownContexts, saveCanvas, snapshotClickHandler } from '../../../../../../src/indexForTest'

describe('snapshot click handler', () => {
	let subject: () => void
	beforeEach(() => {
		subject = snapshotClickHandler.default
		spyOn(mixDownContexts, 'default')
		spyOn(saveCanvas, 'default')

		subject()
	})

	it('mixes down the canvases', () => {
		expect(mixDownContexts.default).toHaveBeenCalled()
	})

	it('exports the current frame', () => {
		subject()

		expect(saveCanvas.default).toHaveBeenCalled()
	})
})
