import executeSelectedHoundstoothEffects from '../../src/execute/executeSelectedHoundstoothEffects'
import activateTestMarkerCanvas from './helpers/activateTestMarkerCanvas'
import { YELLOW, CYAN, TRANSPARENT, ERASE } from '../../src/constants'
import standardTileIsColors from './helpers/standardTileIsColors'
import state from '../../state'
import resetState from '../../src/store/resetState'

describe('erasing', () => {
	beforeEach(() => resetState(state))

	it('makes holes so material from lower layers shows through', () => {
		const houndstoothOverrides = {
			basePattern: {
				viewSettings: { canvasSize: 100 },
				gridSettings: { gridSize: 0 },
				colorSettings: { backgroundColor: YELLOW },
				layerSettings: { endLayer: 1 },
			},
			layersPattern: {
				gridSettings:  { gridSize: () => 2 },
				colorSettings: {
					set: () => [ TRANSPARENT, ERASE ],
					backgroundColor: () => CYAN,
				},
			},
		}
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		expect(standardTileIsColors({
			baseId: 0,
			originInPixels: [ 0, 0 ],
			tileSizeInPixels: 50,
			colors: [ YELLOW, CYAN ],
		})).toBe(true)
		expect(standardTileIsColors({
			baseId: 8,
			originInPixels: [ 50, 0 ],
			tileSizeInPixels: 50,
			colors: [ YELLOW, YELLOW ],
		})).toBe(true)
		expect(standardTileIsColors({
			baseId: 16,
			originInPixels: [ 0, 50 ],
			tileSizeInPixels: 50,
			colors: [ CYAN, CYAN ],
		})).toBe(true)
		expect(standardTileIsColors({
			baseId: 24,
			originInPixels: [ 50, 50 ],
			tileSizeInPixels: 50,
			colors: [ CYAN, YELLOW ],
		})).toBe(true)
	})
})
