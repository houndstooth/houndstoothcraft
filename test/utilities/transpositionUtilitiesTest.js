import transpositionUtilities from '../../src/utilities/transpositionUtilities'
import { CANVAS_SIZE, TILE_SIZE, ZOOM } from '../../src/defaults'

describe('transposition utilities', () => {
	const zoom = 10
	const tileSize = 40
	const canvasSize = 200

	describe('#adjustOrigin', () => {
		let tileOrigin
		let adjustOrigin
		beforeEach(() => {
			tileOrigin = [ 3, 5 ]
			adjustOrigin = transpositionUtilities.adjustOrigin
		})

		it('defaults the zoom level', () => {
			expect(adjustOrigin({ tileOrigin })).toEqual([ 3 * ZOOM, 5 * ZOOM ])
		})

		it('adjusts the origin per the zoom level', () => {
			settings.initial.viewConfig = { zoom }

			expect(adjustOrigin({ tileOrigin })).toEqual([ 3 * zoom, 5 * zoom ])
		})

		describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
			beforeEach(() => {
				settings.initial.viewConfig = {
					zoomOnCanvasCenter: true,
					zoom,
				}
			})

			it('works', () => {
				settings.initial.viewConfig.canvasSize = canvasSize

				expect(adjustOrigin({ tileOrigin })).toEqual([ -870, -850 ])
			})

			it('defaults the canvas size', () => {
				expect(adjustOrigin({ tileOrigin })).toEqual([
					(3 - CANVAS_SIZE / 2) * zoom + CANVAS_SIZE / 2,
					(5 - CANVAS_SIZE / 2) * zoom + CANVAS_SIZE / 2,
				])
			})
		})

		describe('centering view on the center of the tile at address [ 0, 0]', () => {
			beforeEach(() => {
				settings.initial.viewConfig = { centerViewOnCenterOfTileAtZeroZeroAddress: true }
			})

			it('defaults to assuming this is based on the defaults', () => {
				expect(adjustOrigin({ tileOrigin })).toEqual([
					3 * ZOOM + CANVAS_SIZE / 2 - TILE_SIZE / 2,
					5 * ZOOM + CANVAS_SIZE / 2 - TILE_SIZE / 2,
				])
			})

			it('adjusts per the zoom level', () => {
				settings.initial.viewConfig.zoom = zoom

				expect(adjustOrigin({ tileOrigin })).toEqual([
					3 * zoom + CANVAS_SIZE / 2 - TILE_SIZE / 2,
					5 * zoom + CANVAS_SIZE / 2 - TILE_SIZE / 2,
				])
			})

			it('adjusts per the tile size', () => {
				settings.initial.tileConfig = { tileSize }

				expect(adjustOrigin({ tileOrigin })).toEqual([
					3 * ZOOM + CANVAS_SIZE / 2 - tileSize / 2,
					5 * ZOOM + CANVAS_SIZE / 2 - tileSize / 2,
				])
			})

			it('adjusts per the canvas size', () => {
				settings.initial.viewConfig.canvasSize = canvasSize

				expect(adjustOrigin({ tileOrigin })).toEqual([
					3 * ZOOM + canvasSize / 2 - TILE_SIZE / 2,
					5 * ZOOM + canvasSize / 2 - TILE_SIZE / 2,
				])
			})
		})
	})

	describe('#getSizedUnit', () => {
		let getSizedUnit
		beforeEach(() => getSizedUnit = transpositionUtilities.getSizedUnit)

		it('defaults to the default tile size times the default zoom', () => {
			expect(getSizedUnit()).toBe(TILE_SIZE * ZOOM)
		})

		it('adjusts per the zoom level', () => {
			settings.initial.viewConfig = { zoom }

			expect(getSizedUnit()).toEqual(TILE_SIZE * zoom)
		})

		it('adjusts per the tile size', () => {
			settings.initial.tileConfig = { tileSize }

			expect(getSizedUnit()).toEqual(tileSize * ZOOM)
		})

		it('adjusts per both the zoom and tile size', () => {
			settings.initial.viewConfig = { zoom }
			settings.initial.tileConfig = { tileSize }

			expect(getSizedUnit()).toEqual(tileSize * zoom)
		})
	})

	describe('#getTileOriginAndSizedUnit', () => {
		const address = [ 7, 11 ]
		let getTileOriginAndSizedUnit
		beforeEach(() => getTileOriginAndSizedUnit = transpositionUtilities.getTileOriginAndSizedUnit)

		it('defaults to the default tile size and default zoom', () => {
			expect(getTileOriginAndSizedUnit({ address })).toEqual({
				sizedUnit: TILE_SIZE * ZOOM,
				tileOrigin: [ 7 * TILE_SIZE * ZOOM, 11 * TILE_SIZE * ZOOM ],
			})
		})

		it('adjusts per the zoom level', () => {
			settings.initial.viewConfig = { zoom }

			expect(getTileOriginAndSizedUnit({ address })).toEqual({
				sizedUnit: TILE_SIZE * zoom,
				tileOrigin: [ 7 * TILE_SIZE * zoom, 11 * TILE_SIZE * zoom ],
			})
		})

		it('adjusts per the tile size', () => {
			settings.initial.tileConfig = { tileSize }

			expect(getTileOriginAndSizedUnit({ address })).toEqual({
				sizedUnit: tileSize * ZOOM,
				tileOrigin: [ 7 * tileSize * ZOOM, 11 * tileSize * ZOOM ],
			})
		})

		it('adjusts per both the zoom and tile size', () => {
			settings.initial.viewConfig = { zoom }
			settings.initial.tileConfig = { tileSize }

			expect(getTileOriginAndSizedUnit({ address })).toEqual({
				sizedUnit: tileSize * zoom,
				tileOrigin: [ 7 * tileSize * zoom, 11 * tileSize * zoom ],
			})
		})

		it('uses a custom get tile origin and sized unit function if provided', () => {
			const custom = ({ address }) => ({
				sizedUnit: TILE_SIZE * TILE_SIZE * ZOOM,
				tileOrigin: [ address[ 1 ] * TILE_SIZE, address[ 0 ] * TILE_SIZE ],
			})
			settings.initial.getTileOriginAndSizedUnit = custom

			expect(getTileOriginAndSizedUnit({ address })).toEqual({
				sizedUnit: TILE_SIZE * TILE_SIZE * ZOOM,
				tileOrigin: [ 11 * TILE_SIZE, 7 * TILE_SIZE ],
			})
		})
	})
})
