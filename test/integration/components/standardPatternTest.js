import executeSelectedHoundstoothEffects from '../../../src/execute/executeSelectedHoundstoothEffects'
import standardTileIsColors from '../helpers/standardTileIsColors'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../../src/constants'
import state from '../../../state'
import resetState from '../../../src/store/resetState'

describe('standard houndstooth pattern', () => {
	beforeEach(() => resetState(state))

	it('repeats a 2x2 pattern of a solid black, solid white, and two b&w diagonally striped tiles, the striped tiles having four stripes each, and their diagonal stripes being the minor diagonal', () => {
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects()

		const tileSizeInPixels = state.mainHoundstooth.basePattern.tileSettings.tileSizeSetting
		const firstSupertile = [
			{
				baseId: 0,
				originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ TRANSPARENT, BLACK ],
			},
			{
				baseId: 8,
				originInPixels: [ 0 * tileSizeInPixels, 1 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLACK, BLACK ],
			},
			{
				baseId: 16,
				originInPixels: [ 1 * tileSizeInPixels, 0 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ TRANSPARENT, TRANSPARENT ],
			},
			{
				baseId: 24,
				originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLACK, TRANSPARENT ],
			},
		]
		const secondSupertile = [
			{
				baseId: 32,
				originInPixels: [ 2 * tileSizeInPixels, 0 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ TRANSPARENT, BLACK ],
			},
			{
				baseId: 40,
				originInPixels: [ 2 * tileSizeInPixels, 1 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLACK, BLACK ],
			},
			{
				baseId: 48,
				originInPixels: [ 3 * tileSizeInPixels, 0 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ TRANSPARENT, TRANSPARENT ],
			},
			{
				baseId: 56,
				originInPixels: [ 3 * tileSizeInPixels, 1 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLACK, TRANSPARENT ],
			},
		]
		const thirdSupertile = [
			{
				baseId: 64,
				originInPixels: [ 0 * tileSizeInPixels, 2 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ TRANSPARENT, BLACK ],
			},
			{
				baseId: 72,
				originInPixels: [ 0 * tileSizeInPixels, 3 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLACK, BLACK ],
			},
			{
				baseId: 80,
				originInPixels: [ 1 * tileSizeInPixels, 2 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ TRANSPARENT, TRANSPARENT ],
			},
			{
				baseId: 88,
				originInPixels: [ 1 * tileSizeInPixels, 3 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLACK, TRANSPARENT ],
			},
		]
		const fourthSupertile = [
			{
				baseId: 96,
				originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ TRANSPARENT, BLACK ],
			},
			{
				baseId: 104,
				originInPixels: [ 2 * tileSizeInPixels, 3 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLACK, BLACK ],
			},
			{
				baseId: 112,
				originInPixels: [ 3 * tileSizeInPixels, 2 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ TRANSPARENT, TRANSPARENT ],
			},
			{
				baseId: 120,
				originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLACK, TRANSPARENT ],
			},
		]
		const tiles = firstSupertile.concat(secondSupertile).concat(thirdSupertile).concat(fourthSupertile)
		tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
	})
})
