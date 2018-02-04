import { BLACK, from, patternState, to, TRANSPARENT, Unit } from '../../../src/indexForTest'
import standardTileIsColors from './standardTileIsColors'
import { StandardTileExpectation } from './types'

const expectStandardPattern: () => void =
	(): void => {
		let baseId: number = -8
		const tileSize: Unit = patternState.tileSettings.tileSize
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
	}

export default expectStandardPattern
