import { executeSelectedHoundstoothEffects } from '../../../../src/app/execute/executeSelectedHoundstoothEffects'
import { getFromBaseOrDefaultPattern } from '../../../../src/app/store/getFromBaseOrDefaultPattern'
import { BLACK, TRANSPARENT, WHITE } from '../../../../src/constants'
import * as from from '../../../../src/from'
import { Unit } from '../../../../src/pattern/grid/types'
import { Effect } from '../../../../src/pattern/types'
import * as to from '../../../../src/to'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'
import { StandardTileExpectation } from '../../helpers/types'

describe('.gridSettings', () => {
	const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')

	describe('.tileResolution', () => {
		it('changes how many tiles there are per dimension', async (done: DoneFn) => {
			const houndstoothOverrides: Effect = {
				basePattern: {
					colorSettings: {
						colorSet: to.ColorSet([ BLACK, WHITE ]),
					},
					gridSettings: {
						tileResolution: 3,
					},
					viewSettings: {
						canvasSize: to.Px(200),
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			setTimeout(() => {
				const tiles: StandardTileExpectation[] = [
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

				tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))

				done()
			},         0)
		})
	})

	describe('.includeNegativeQuadrants', () => {
		// tslint:disable-next-line:max-line-length
		it('quadruples the number of tiles, adding them not only in the positive x positive y quadrant, but negative x positive y, positive x negative y, and negative x negative y', async (done: DoneFn) => {
			const houndstoothOverrides: Effect = {
				basePattern: {
					gridSettings: {
						includeNegativeQuadrants: true,
						tileResolution: 1,
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

			setTimeout(() => {
				const tiles: StandardTileExpectation[] = [
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
				tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))

				done()
			},         0)
		})
	})
})
