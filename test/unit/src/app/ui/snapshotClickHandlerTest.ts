import * as render from '../../../../../src/app/render'
import { snapshotClickHandler } from '../../../../../src/app/ui/snapshotClickHandler'
import * as pattern from '../../../../../src/pattern'

describe('snapshot click handler', () => {
	beforeEach(() => {
		spyOn(render, 'mixDownContexts')
		spyOn(pattern, 'exportFrame')

		snapshotClickHandler()
	})

	it('mixes down the canvases', () => {
		expect(render.mixDownContexts).toHaveBeenCalled()
	})

	it('exports the current frame', () => {
		snapshotClickHandler()

		expect(pattern.exportFrame).toHaveBeenCalled()
	})
})
