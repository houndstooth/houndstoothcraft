import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import standardTileIsColors from '../../helpers/standardTileIsColors'
import { BLACK, TRANSPARENT, WHITE } from '../../../../src/constants'
import { TILE_SIZE } from '../../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../../helpers/getFromBasePatternOrDefault'
import CanvasSize from '../../../../src/canvas/types/CanvasSize'
import Coordinate from '../../../../src/space/types/Coordinate'

describe('.gridSettings', () => {
	const tileSize = getFromBasePatternOrDefault(TILE_SIZE) as any

	describe('.gridSize', () => {
		it('changes how many tiles there are', () => {
			const houndstoothOverrides = {
				basePattern: {
					viewSettings: {
						canvasSize: 200 as CanvasSize,
					},
					colorSettings: {
						colorSet: [ BLACK, WHITE ],
					},
					gridSettings: {
						gridSize: 3,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const tiles = [
				{
					baseId: 0,
					tileOrigin: [ 0 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ WHITE, BLACK ],
				},
				{
					baseId: 8,
					tileOrigin: [ 0 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ BLACK, BLACK ],
				},
				{
					baseId: 16,
					tileOrigin: [ 0 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ WHITE, BLACK ],
				},
				{
					baseId: 24,
					tileOrigin: [ 0 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},

				{
					baseId: 32,
					tileOrigin: [ 1 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ WHITE, WHITE ],
				},
				{
					baseId: 40,
					tileOrigin: [ 1 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ BLACK, WHITE ],
				},
				{
					baseId: 48,
					tileOrigin: [ 1 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ WHITE, WHITE ],
				},
				{
					baseId: 56,
					tileOrigin: [ 1 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},

				{
					baseId: 64,
					tileOrigin: [ 2 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ WHITE, BLACK ],
				},
				{
					baseId: 72,
					tileOrigin: [ 2 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ BLACK, BLACK ],
				},
				{
					baseId: 80,
					tileOrigin: [ 2 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ WHITE, BLACK ],
				},
				{
					baseId: 88,
					tileOrigin: [ 2 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},

				{
					baseId: 96,
					tileOrigin: [ 3 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{
					baseId: 104,
					tileOrigin: [ 3 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{
					baseId: 112,
					tileOrigin: [ 3 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{
					baseId: 120,
					tileOrigin: [ 3 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
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
					viewSettings: {
						canvasSize: 300 as CanvasSize,
						centerViewOnCenterOfTileAtHomeAddress: true,
					},
					tileSettings: {
						tileSizeSetting,
					},
					gridSettings: {
						gridSize: 1,
						includeNegativeQuadrants: true,
					},
				},
			}
			activateTestMarkerCanvas()
			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const tiles = [
				{
					baseId: 0,
					tileOrigin: [ 125 as any, 125 as any ] as Coordinate,
					tileSize: tileSizeSetting,
					colors: [ TRANSPARENT, BLACK ],
				},
				{
					baseId: 8,
					tileOrigin: [ 75 as any, 125 as any ] as Coordinate,
					tileSize: tileSizeSetting,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{
					baseId: 24,
					tileOrigin: [ 75 as any, 75 as any ] as Coordinate,
					tileSize: tileSizeSetting,
					colors: [ BLACK, TRANSPARENT ],
				},
				{
					baseId: 16,
					tileOrigin: [ 125 as any, 75 as any ] as Coordinate,
					tileSize: tileSizeSetting,
					colors: [ BLACK, BLACK ],
				},
			]
			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})
	})
})
