import {
	exportCanvas,
	mixDownContexts,
	NullarySideEffector,
	snapshotClickHandler,
} from '../../../../../src/indexForTest'

describe('snapshot click handler', () => {
	let subject: NullarySideEffector
	beforeEach(() => {
		subject = snapshotClickHandler.default
		spyOn(mixDownContexts, 'default')
		spyOn(exportCanvas, 'default')

		subject()
	})

	it('mixes down the canvases', () => {
		expect(mixDownContexts.default).toHaveBeenCalled()
	})

	it('exports the current frame', () => {
		subject()

		expect(exportCanvas.default).toHaveBeenCalled()
	})
})
