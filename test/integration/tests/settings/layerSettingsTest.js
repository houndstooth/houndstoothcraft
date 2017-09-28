import pixelIsColorWithMarker from '../../helpers/pixelIsColorWithMarker'
import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import { YELLOW, CYAN, TRANSPARENT, ERASE } from '../../../../src/constants'
import standardTileIsColors from '../../helpers/standardTileIsColors'

describe('.layerSettings', () => {
	it('blends colors from semi-translucent layers', () => {
		const houndstoothOverrides = {
			basePattern: {
				viewSettings: { canvasSize: 100 },
				gridSettings: { gridSize: 2 },
				colorSettings: { backgroundColor: YELLOW },
				layerSettings: { endLayer: 1 },
			},
			layersPattern: {
				colorSettings: {
					backgroundColor: () => CYAN,
					opacity: () => 0.25,
				},
			},
		}
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		const BLENDED_COLOR = { r: 192, g: 255, b: 63, a: 1 }
		const pixelInCellThatDemonstratesBlending = [ 75, 25 ]
		const passed = pixelIsColorWithMarker({
			coordinateUnderTest: pixelInCellThatDemonstratesBlending,
			expectedColor: BLENDED_COLOR,
			id: 1,
		})
		expect(passed).toBe(true)
	})

	it('erasing makes holes so material from lower layers shows through', () => {
		const houndstoothOverrides = {
			basePattern: {
				viewSettings: { canvasSize: 100 },
				gridSettings: { gridSize: 0 },
				colorSettings: { backgroundColor: YELLOW },
				layerSettings: { endLayer: 1 },
			},
			layersPattern: {
				gridSettings: { gridSize: () => 2 },
				colorSettings: {
					colorSet: () => [ TRANSPARENT, ERASE ],
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
