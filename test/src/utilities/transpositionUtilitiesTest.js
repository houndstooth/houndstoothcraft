import transpositionUtilities from '../../../src/utilities/transpositionUtilities'
import setup from '../../../src/settings/setup'

describe('transposition utilities', () => {
	const zoom = 10
	const tileSize = 40
	const canvasSize = 200

	beforeEach(() => setup())

	describe('#adjustOrigin', () => {
		let tileOrigin
		let adjustOrigin
		beforeEach(() => {
			tileOrigin = [ 3, 5 ]
			adjustOrigin = transpositionUtilities.adjustOrigin
		})

		it('adjusts the origin per the zoom level', () => {
			current.settings.initial.viewSettings = { zoom }

			expect(adjustOrigin({ tileOrigin })).toEqual([ 3 * zoom, 5 * zoom ])
		})

		describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
			beforeEach(() => {
				current.settings.initial.viewSettings.zoomOnCanvasCenter = true
				current.settings.initial.viewSettings.zoom = zoom
			})

			it('works', () => {
				current.settings.initial.viewSettings.canvasSize = canvasSize

				expect(adjustOrigin({ tileOrigin })).toEqual([ -870, -850 ])
			})

			it('does not readjust for zooming on the center if it already is centered', () => {
				current.settings.initial.viewSettings.centerViewOnCenterOfTileAtZeroZeroAddress = true

				expect(adjustOrigin({ tileOrigin })).toEqual([ 405, 425 ])
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

				expect(adjustOrigin({ tileOrigin })).toEqual([
					3 * zoom + canvasSize / 2 - tileSize / 2,
					5 * zoom + canvasSize / 2 - tileSize / 2,
				])
			})
		})
	})

	describe('#getSizedUnit', () => {
		let getSizedUnit
		beforeEach(() => getSizedUnit = transpositionUtilities.getSizedUnit)

		it('adjusts per both the zoom and tile size', () => {
			current.settings.initial.viewSettings = { zoom }
			current.settings.initial.tileSettings = { tileSize }

			expect(getSizedUnit()).toEqual(tileSize * zoom)
		})
	})

	describe('#getTileOriginAndSizedUnit', () => {
		const address = [ 7, 11 ]
		let getTileOriginAndSizedUnit
		beforeEach(() => getTileOriginAndSizedUnit = transpositionUtilities.getTileOriginAndSizedUnit)

		it('adjusts per both the zoom and tile size', () => {
			current.settings.initial.viewSettings = { zoom }
			current.settings.initial.tileSettings = { tileSize }

			expect(getTileOriginAndSizedUnit({ address })).toEqual({
				sizedUnit: tileSize * zoom,
				tileOrigin: [ 7 * tileSize * zoom, 11 * tileSize * zoom ],
			})
		})

		it('uses a custom get tile origin and sized unit function if provided', () => {
			const custom = ({ address }) => ({
				sizedUnit: tileSize * tileSize * zoom,
				tileOrigin: [ address[ 1 ] * tileSize, address[ 0 ] * tileSize ],
			})
			current.settings.initial.getTileOriginAndSizedUnit = custom

			expect(getTileOriginAndSizedUnit({ address })).toEqual({
				sizedUnit: tileSize * tileSize * zoom,
				tileOrigin: [ 11 * tileSize, 7 * tileSize ],
			})
		})
	})
})
