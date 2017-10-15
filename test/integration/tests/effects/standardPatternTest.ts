import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import standardTileIsColors from '../../helpers/standardTileIsColors'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import state from '../../../../src/state'
import Coordinate from '../../../../src/space/types/Coordinate'

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
				tileOrigin: [ 0 * tileSize as any, 0 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ TRANSPARENT, BLACK ],
			},
			{
				baseId: 8,
				tileOrigin: [ 0 * tileSize as any, 1 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLACK, BLACK ],
			},
			{
				baseId: 16,
				tileOrigin: [ 1 * tileSize as any, 0 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ TRANSPARENT, TRANSPARENT ],
			},
			{
				baseId: 24,
				tileOrigin: [ 1 * tileSize as any, 1 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLACK, TRANSPARENT ],
			},
		]
		const secondSupertile = [
			{
				baseId: 32,
				tileOrigin: [ 2 * tileSize as any, 0 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ TRANSPARENT, BLACK ],
			},
			{
				baseId: 40,
				tileOrigin: [ 2 * tileSize as any, 1 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLACK, BLACK ],
			},
			{
				baseId: 48,
				tileOrigin: [ 3 * tileSize as any, 0 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ TRANSPARENT, TRANSPARENT ],
			},
			{
				baseId: 56,
				tileOrigin: [ 3 * tileSize as any, 1 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLACK, TRANSPARENT ],
			},
		]
		const thirdSupertile = [
			{
				baseId: 64,
				tileOrigin: [ 0 * tileSize as any, 2 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ TRANSPARENT, BLACK ],
			},
			{
				baseId: 72,
				tileOrigin: [ 0 * tileSize as any, 3 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLACK, BLACK ],
			},
			{
				baseId: 80,
				tileOrigin: [ 1 * tileSize as any, 2 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ TRANSPARENT, TRANSPARENT ],
			},
			{
				baseId: 88,
				tileOrigin: [ 1 * tileSize as any, 3 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLACK, TRANSPARENT ],
			},
		]
		const fourthSupertile = [
			{
				baseId: 96,
				tileOrigin: [ 2 * tileSize as any, 2 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ TRANSPARENT, BLACK ],
			},
			{
				baseId: 104,
				tileOrigin: [ 2 * tileSize as any, 3 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLACK, BLACK ],
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
				colors: [ BLACK, TRANSPARENT ],
			},
		]
		const tiles = firstSupertile.concat(secondSupertile).concat(thirdSupertile).concat(fourthSupertile)
		tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
	})
})
