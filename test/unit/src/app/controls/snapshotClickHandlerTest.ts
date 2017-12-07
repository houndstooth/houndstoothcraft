import { exportCanvas, mixDownContexts, NullarySideEffector, snapshotClickHandler } from '../../../../../src'

const subject: NullarySideEffector = snapshotClickHandler.default

describe('snapshot click handler', () => {
	beforeEach(() => {
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
