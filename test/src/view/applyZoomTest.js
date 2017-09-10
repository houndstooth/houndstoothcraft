import state from '../../../state'
import applyZoom from '../../../src/view/applyZoom'

describe('apply zoom', () => {
	const zoom = 2
	const canvasSize = 200
	let outline
	beforeEach(() => {
		outline = [
			[ 50, 50 ],
			[ 100, 50 ],
			[ 100, 100 ],
			[ 50, 100 ],
		]
		state.mainHoundstooth.basePattern.viewSettings = { zoom, canvasSize }
	})

	it('adjusts the outline per the zoom level', () => {
		expect(applyZoom(outline)).toEqual([
			[ 100, 100 ],
			[ 200, 100 ],
			[ 200, 200 ],
			[ 100, 200 ],
		])
	})

	describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
		beforeEach(() => {
			state.mainHoundstooth.basePattern.viewSettings.zoomOnCanvasCenter = true
		})

		it('works', () => {
			expect(applyZoom(outline)).toEqual([
				[ 0, 0 ],
				[ 100, 0 ],
				[ 100, 100 ],
				[ 0, 100 ],
			])
		})

		describe('when the view is already centered', () => {
			beforeEach(() => {
				state.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress = true
			})
		})

		it('does not double-up on adjusting for centering the view', () => {
			expect(applyZoom(outline)).toEqual([
				[ 0, 0 ],
				[ 100, 0 ],
				[ 100, 100 ],
				[ 0, 100 ],
			])
		})
	})
})
