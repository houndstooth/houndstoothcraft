import { from, to } from '../../../../src'
import { Unit } from '../../../../src/components/types/Unit'
import { BLACK, TRANSPARENT, WHITE } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'

describe('.gridSettings', () => {
	const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')

	describe('.gridSize', () => {
		it('changes how many tiles there are', () => {
			const houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: to.ColorSet([ BLACK, WHITE ]),
					},
					gridSettings: {
						gridSize: 3,
					},
					viewSettings: {
						canvasSize: to.Px(200),
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const tiles = [
				{
					baseId: 0,
					colors: [ WHITE, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 0 ]),
					tileSize,
				},
				{
					baseId: 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 1 ]),
					tileSize,
				},
				{
					baseId: 16,
					colors: [ WHITE, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 2 ]),
					tileSize,
				},
				{
					baseId: 24,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 3 ]),
					tileSize,
				},

				{
					baseId: 32,
					colors: [ WHITE, WHITE ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 0 ]),
					tileSize,
				},
				{
					baseId: 40,
					colors: [ BLACK, WHITE ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 1 ]),
					tileSize,
				},
				{
					baseId: 48,
					colors: [ WHITE, WHITE ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 2 ]),
					tileSize,
				},
				{
					baseId: 56,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 3 ]),
					tileSize,
				},

				{
					baseId: 64,
					colors: [ WHITE, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 0 ]),
					tileSize,
				},
				{
					baseId: 72,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 1 ]),
					tileSize,
				},
				{
					baseId: 80,
					colors: [ WHITE, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 2 ]),
					tileSize,
				},
				{
					baseId: 88,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 3 ]),
					tileSize,
				},

				{
					baseId: 96,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 0 ]),
					tileSize,
				},
				{
					baseId: 104,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 1 ]),
					tileSize,
				},
				{
					baseId: 112,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 2 ]),
					tileSize,
				},
				{
					baseId: 120,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 3 ]),
					tileSize,
				},
			]

			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})
	})

	describe('.includeNegativeQuadrants', () => {
		// tslint:disable-next-line:max-line-length
		it('quadruples the number of tiles, adding them not only in the positive x positive y quadrant, but negative x positive y, positive x negative y, and negative x negative y', () => {
			const houndstoothOverrides = {
				basePattern: {
					gridSettings: {
						gridSize: 1,
						includeNegativeQuadrants: true,
					},
					tileSettings: {
						tileSize,
					},
					viewSettings: {
						canvasSize: to.Px(300),
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
					tileOrigin: to.Coordinate([ 125, 125 ]),
					tileSize,
				},
				{
					baseId: 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ 75, 125 ]),
					tileSize,
				},
				{
					baseId: 24,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ 75, 75 ]),
					tileSize,
				},
				{
					baseId: 16,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ 125, 75 ]),
					tileSize,
				},
			]
			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})
	})
})
