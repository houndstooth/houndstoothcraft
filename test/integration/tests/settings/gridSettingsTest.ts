import CanvasSize from '../../../../src/canvas/types/CanvasSize'
import { BLACK, TRANSPARENT, WHITE } from '../../../../src/constants'
import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import Coordinate from '../../../../src/space/types/Coordinate'
import getFromBasePatternOrDefault from '../../../helpers/getFromBasePatternOrDefault'
import { TILE_SIZE } from '../../../helpers/settingsPaths'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import standardTileIsColors from '../../helpers/standardTileIsColors'

describe('.gridSettings', () => {
	const tileSize = getFromBasePatternOrDefault(TILE_SIZE) as any

	describe('.gridSize', () => {
		it('changes how many tiles there are', () => {
			const houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: [ BLACK, WHITE ],
					},
					gridSettings: {
						gridSize: 3,
					},
					viewSettings: {
						canvasSize: 200 as CanvasSize,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const tiles = [
				{
					baseId: 0,
					colors: [ WHITE, BLACK ],
					tileOrigin: [ 0 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: [ 0 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 16,
					colors: [ WHITE, BLACK ],
					tileOrigin: [ 0 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 24,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: [ 0 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
				},

				{
					baseId: 32,
					colors: [ WHITE, WHITE ],
					tileOrigin: [ 1 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 40,
					colors: [ BLACK, WHITE ],
					tileOrigin: [ 1 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 48,
					colors: [ WHITE, WHITE ],
					tileOrigin: [ 1 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 56,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: [ 1 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
				},

				{
					baseId: 64,
					colors: [ WHITE, BLACK ],
					tileOrigin: [ 2 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 72,
					colors: [ BLACK, BLACK ],
					tileOrigin: [ 2 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 80,
					colors: [ WHITE, BLACK ],
					tileOrigin: [ 2 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 88,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: [ 2 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
				},

				{
					baseId: 96,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: [ 3 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 104,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: [ 3 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 112,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: [ 3 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
				},
				{
					baseId: 120,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: [ 3 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
				},
			]

			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})
	})

	describe('.includeNegativeQuadrants', () => {
		// tslint:disable-next-line:max-line-length
		it('quadruples the number of tiles, adding them not only in the positive x positive y quadrant, but negative x positive y, positive x negative y, and negative x negative y', () => {
			const tileSizeSetting = 50 as any
			const houndstoothOverrides = {
				basePattern: {
					gridSettings: {
						gridSize: 1,
						includeNegativeQuadrants: true,
					},
					tileSettings: {
						tileSizeSetting,
					},
					viewSettings: {
						canvasSize: 300 as CanvasSize,
						centerViewOnCenterOfTileAtHomeAddress: true,
					},
				},
			}
			activateTestMarkerCanvas()
			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const tiles = [
				{
					baseId: 0,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: [ 125 as any, 125 as any ] as Coordinate,
					tileSize: tileSizeSetting,
				},
				{
					baseId: 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: [ 75 as any, 125 as any ] as Coordinate,
					tileSize: tileSizeSetting,
				},
				{
					baseId: 24,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: [ 75 as any, 75 as any ] as Coordinate,
					tileSize: tileSizeSetting,
				},
				{
					baseId: 16,
					colors: [ BLACK, BLACK ],
					tileOrigin: [ 125 as any, 75 as any ] as Coordinate,
					tileSize: tileSizeSetting,
				},
			]
			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})
	})
})
