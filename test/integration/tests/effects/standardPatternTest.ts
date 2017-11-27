import {
	constants,
	executeSelectedHoundstoothEffects,
	from,
	getSetting,
	to,
	Unit,
} from '../../../../src'
import { activateTestMarkerCanvas, StandardTileExpectation, standardTileIsColors } from '../../helpers'

const { BLACK, TRANSPARENT } = constants

describe('standard houndstooth pattern', () => {
	// tslint:disable-next-line:max-line-length
	it('repeats a 2x2 pattern of a solid black, solid white, and two b&w diagonally striped tiles, the striped tiles having four stripes each, and their diagonal stripes being the minor diagonal', async (done: DoneFn) => {
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects.default({
			houndstoothOverrides: {
				basePattern: {
					gridSettings: { tileResolution: 4 },
				},
			},
		})

		setTimeout(() => {
			let baseId: number = -8
			const tileSize: Unit = getSetting.default('tileSize')
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
