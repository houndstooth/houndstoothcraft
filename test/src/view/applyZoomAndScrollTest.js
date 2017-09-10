import composeMainHoundstooth from '../../../src/execute/composeMainHoundstooth'
import state from '../../../state'
import applyZoomAndScroll from '../../../src/view/applyZoomAndScroll'

describe('apply zoom and scroll', () => {
	const zoom = 10
	const tileSize = 40
	const canvasSize = 200
	let outline
	beforeEach(() => {
		composeMainHoundstooth()
		outline = [
			[ 3, 5 ],
			[ 4, 5 ],
			[ 3, 4 ],
		]
	})

	it('adjusts the outline per the zoom level', () => {
		state.mainHoundstooth.basePattern.viewSettings.zoom = zoom

		expect(applyZoomAndScroll(outline)).toEqual([
			[ 30, 50 ],
			[ 40, 50 ],
			[ 30, 40 ],
		])
	})

	describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
		beforeEach(() => {
			state.mainHoundstooth.basePattern.viewSettings.zoomOnCanvasCenter = true
			state.mainHoundstooth.basePattern.viewSettings.zoom = zoom
		})

		it('works', () => {
			state.mainHoundstooth.basePattern.viewSettings.canvasSize = canvasSize

			expect(applyZoomAndScroll(outline)).toEqual([
				[ -870, -850 ],
				[ -860, -850 ],
				[ -870, -860 ],
			])
		})

		it('does not readjust for zooming on the center if it already is centered', () => {
			state.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress = true

			expect(applyZoomAndScroll(outline)).toEqual([
				[ 405, 425 ],
				[ 415, 425 ],
				[ 405, 415 ],
			])
		})
	})

	describe('centering view on the center of the tile at grid address [ 0, 0 ]', () => {
		beforeEach(() => {
			state.mainHoundstooth.basePattern.viewSettings = {
				centerViewOnCenterOfTileAtZeroZeroAddress: true,
				zoom,
				canvasSize,
			}
			state.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting: tileSize }
		})

		it('adjusts per the zoom, tile, and canvas size', () => {
			state.mainHoundstooth.basePattern.viewSettings.zoom = zoom

			expect(applyZoomAndScroll(outline)).toEqual([
				[
					3 * zoom + canvasSize / 2 - tileSize / 2,
					5 * zoom + canvasSize / 2 - tileSize / 2,
				],
				[
					4 * zoom + canvasSize / 2 - tileSize / 2,
					5 * zoom + canvasSize / 2 - tileSize / 2,
				],
				[
					3 * zoom + canvasSize / 2 - tileSize / 2,
					4 * zoom + canvasSize / 2 - tileSize / 2,
				],
			])
		})
	})
})
