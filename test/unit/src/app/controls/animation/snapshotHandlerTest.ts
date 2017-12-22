import { mixDownContexts, saveCanvas, snapshotHandler } from '../../../../../../src/indexForTest'

describe('snapshot handler', () => {
	let subject: () => void
	beforeEach(() => {
		subject = snapshotHandler.default
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
