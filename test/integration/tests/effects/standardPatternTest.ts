import { BLACK, TRANSPARENT } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { Coordinate } from '../../../../src/space/types/Coordinate'
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
				tileOrigin: [ tileSize * 0 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			},
		]
		const secondSupertile = [
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ tileSize * 3 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ tileSize * 3 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			},
		]
		const thirdSupertile = [
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 3 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 3 as any ] as Coordinate,
				tileSize,
			},
		]
		const fourthSupertile = [
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 3 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ tileSize * 3 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: baseId += 8,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ tileSize * 3 as any, tileSize * 3 as any ] as Coordinate,
				tileSize,
			},
		]
		const tiles = firstSupertile.concat(secondSupertile).concat(thirdSupertile).concat(fourthSupertile)
		tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
	})
})
