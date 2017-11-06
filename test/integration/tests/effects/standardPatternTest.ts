import { from, to } from '../../../../src'
import { Unit } from '../../../../src/components'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'
import { StandardTileExpectation } from '../../helpers/types'

describe('standard houndstooth pattern', () => {
	// tslint:disable-next-line:max-line-length
	it('repeats a 2x2 pattern of a solid black, solid white, and two b&w diagonally striped tiles, the striped tiles having four stripes each, and their diagonal stripes being the minor diagonal', async (done: DoneFn) => {
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({
			houndstoothOverrides: {
				basePattern: {
					gridSettings: { tileResolution: 4 },
				},
			},
		})

		setTimeout(() => {
			let baseId: number = -8
			const tileSize: Unit = getFromBaseOrDefaultPattern('tileSize')
			const firstSupertileExpectations: StandardTileExpectation[] = [
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 0 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 1 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 0 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 1 ]),
					tileSize,
				},
			]
			const secondSupertileExpectations: StandardTileExpectation[] = [
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 0 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 1 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 0 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 1 ]),
					tileSize,
				},
			]
			const thirdSupertileExpectations: StandardTileExpectation[] = [
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 2 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 3 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 2 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 3 ]),
					tileSize,
				},
			]
			const fourthSupertileExpectations: StandardTileExpectation[] = [
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 2 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 3 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 2 ]),
					tileSize,
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 3 ]),
					tileSize,
				},
			]
			const tiles: StandardTileExpectation[] = firstSupertileExpectations
				.concat(secondSupertileExpectations)
				.concat(thirdSupertileExpectations)
				.concat(fourthSupertileExpectations)
			tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))

			done()
		},         0)
	})
})
