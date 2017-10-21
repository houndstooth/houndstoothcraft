import { to } from '../../../../src'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { state } from '../../../../src/state'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'

describe('standard houndstooth pattern', () => {
	// tslint:disable-next-line:max-line-length
	it('repeats a 2x2 pattern of a solid black, solid white, and two b&w diagonally striped tiles, the striped tiles having four stripes each, and their diagonal stripes being the minor diagonal', () => {
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({
			houndstoothOverrides: {
				basePattern: {
					gridSettings: { gridSize: 4 },
				},
			},
		})

		let baseId = -8
		const tileSize = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
		const firstSupertile = [
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: to.Coordinate([ tileSize * 0, tileSize * 0 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, BLACK ],
				tileOrigin: to.Coordinate([ tileSize * 0, tileSize * 1 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: to.Coordinate([ tileSize * 1, tileSize * 0 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: to.Coordinate([ tileSize * 1, tileSize * 1 ]),
				tileSize,
			},
		]
		const secondSupertile = [
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: to.Coordinate([ tileSize * 2, tileSize * 0 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, BLACK ],
				tileOrigin: to.Coordinate([ tileSize * 2, tileSize * 1 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: to.Coordinate([ tileSize * 3, tileSize * 0 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: to.Coordinate([ tileSize * 3, tileSize * 1 ]),
				tileSize,
			},
		]
		const thirdSupertile = [
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: to.Coordinate([ tileSize * 0, tileSize * 2 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, BLACK ],
				tileOrigin: to.Coordinate([ tileSize * 0, tileSize * 3 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: to.Coordinate([ tileSize * 1, tileSize * 2 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: to.Coordinate([ tileSize * 1, tileSize * 3 ]),
				tileSize,
			},
		]
		const fourthSupertile = [
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: to.Coordinate([ tileSize * 2, tileSize * 2 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, BLACK ],
				tileOrigin: to.Coordinate([ tileSize * 2, tileSize * 3 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: to.Coordinate([ tileSize * 3, tileSize * 2 ]),
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: to.Coordinate([ tileSize * 3, tileSize * 3 ]),
				tileSize,
			},
		]
		const tiles = firstSupertile.concat(secondSupertile).concat(thirdSupertile).concat(fourthSupertile)
		tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
	})
})
