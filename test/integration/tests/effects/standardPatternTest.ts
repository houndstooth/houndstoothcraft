import { BLACK, TRANSPARENT } from '../../../../src/constants'
import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import Coordinate from '../../../../src/space/types/Coordinate'
import state from '../../../../src/state'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import standardTileIsColors from '../../helpers/standardTileIsColors'

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

		const basePattern = state.mainHoundstooth.basePattern || {}
		const tileSettings = basePattern.tileSettings || {}
		const tileSize = tileSettings.tileSizeSetting as any
		const firstSupertile = [
			{
				baseId: 0,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 8,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 16,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 24,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			},
		]
		const secondSupertile = [
			{
				baseId: 32,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 40,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 48,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ tileSize * 3 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 56,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ tileSize * 3 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			},
		]
		const thirdSupertile = [
			{
				baseId: 64,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 72,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 3 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 80,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 88,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 3 as any ] as Coordinate,
				tileSize,
			},
		]
		const fourthSupertile = [
			{
				baseId: 96,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 104,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 3 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 112,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ tileSize * 3 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			},
			{
				baseId: 120,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ tileSize * 3 as any, tileSize * 3 as any ] as Coordinate,
				tileSize,
			},
		]
		const tiles = firstSupertile.concat(secondSupertile).concat(thirdSupertile).concat(fourthSupertile)
		tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
	})
})
