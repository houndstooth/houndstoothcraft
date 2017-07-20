import viewUtilities from '../../../src/utilities/viewUtilities'
import setup from '../../../src/settings/setup'

describe('view utilities', () => {
	const zoom = 10
	const tileSize = 40
	const canvasSize = 200

	beforeEach(() => setup())

	describe('#applyZoomAndScroll', () => {
		let tileOrigin
		let applyZoomAndScroll
		beforeEach(() => {
			tileOrigin = [ 3, 5 ]
			applyZoomAndScroll = viewUtilities.applyZoomAndScroll
		})

		it('adjusts the origin per the zoom level', () => {
			current.settings.initial.viewSettings.zoom = zoom

			expect(applyZoomAndScroll({ tileOrigin, tileSize })).toEqual({
				zoomedAndScrolledTileOrigin: [ 30, 50 ],
				zoomedTileSize: 400,
			})
		})

		it('does not mutate the tileOrigin', () => {
			current.settings.initial.viewSettings.zoom = zoom
			const originalTileOrigin = tileOrigin.slice()

			applyZoomAndScroll({ tileOrigin, tileSize })

			expect(tileOrigin).toEqual(originalTileOrigin)
		})

		describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
			beforeEach(() => {
				current.settings.initial.viewSettings.zoomOnCanvasCenter = true
				current.settings.initial.viewSettings.zoom = zoom
			})

			it('works', () => {
				current.settings.initial.viewSettings.canvasSize = canvasSize

				expect(applyZoomAndScroll({ tileOrigin, tileSize })).toEqual({
					zoomedAndScrolledTileOrigin: [ -870, -850 ],
					zoomedTileSize: 400,
				})
			})

			it('does not readjust for zooming on the center if it already is centered', () => {
				current.settings.initial.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress = true

				expect(applyZoomAndScroll({ tileOrigin, tileSize })).toEqual({
					zoomedAndScrolledTileOrigin: [ 405, 425 ],
					zoomedTileSize: 400,
				})
			})
		})

		describe('centering view on the center of the tile at address [ 0, 0 ]', () => {
			beforeEach(() => {
				current.settings.initial.viewSettings = {
					centerViewOnCenterOfTileAtZeroZeroAddress: true,
					zoom,
					canvasSize,
				}
				current.settings.initial.tileSettings = { tileSize }
			})

			it('adjusts per the zoom, tile, and canvas size', () => {
				current.settings.initial.viewSettings.zoom = zoom

				expect(applyZoomAndScroll({ tileOrigin, tileSize })).toEqual({
					zoomedAndScrolledTileOrigin: [
						3 * zoom + canvasSize / 2 - tileSize / 2,
						5 * zoom + canvasSize / 2 - tileSize / 2,
					],
					zoomedTileSize: zoom * tileSize,
				})
			})
		})
	})

	describe('#rotateShapeAboutCanvasCenter', () => {
		xit('this needs a test now', () => {})
	})
})
