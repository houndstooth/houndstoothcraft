import { to } from '../../../../src'
import { CYAN, ERASE, TRANSPARENT, YELLOW } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { pixelIsColorWithMarker } from '../../helpers/pixelIsColorWithMarker'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'

describe('.layerSettings', () => {
	it('blends colors from semi-translucent layers', () => {
		const houndstoothOverrides = {
			basePattern: {
				colorSettings: { backgroundColor: YELLOW },
				gridSettings: { gridSize: 2 },
				layerSettings: { endLayer: to.Layer(1) },
				viewSettings: { canvasSize: to.Dimension(100) },
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

		const BLENDED_COLOR = to.Color({ r: 192, g: 255, b: 63, a: 1 })
		const pixelInCellThatDemonstratesBlending = to.Coordinate([ 75, 25 ])
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
				colorSettings: { backgroundColor: YELLOW },
				gridSettings: { gridSize: 0 },
				layerSettings: { endLayer: to.Layer(1) },
				viewSettings: { canvasSize: to.Dimension(100) },
			},
			layersPattern: {
				colorSettings: {
					backgroundColor: () => CYAN,
					colorSet: () => [ TRANSPARENT, ERASE ],
				},
				gridSettings: { gridSize: () => 2 },
			},
		}
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		let baseId = -8
		expect(standardTileIsColors({
			baseId: baseId += 8,
			colors: [ YELLOW, CYAN ],
			tileOrigin: to.Coordinate([ 0 , 0 ]),
			tileSize: to.Unit(50),
		})).toBe(true)
		expect(standardTileIsColors({
			baseId: baseId += 8,
			colors: [ YELLOW, YELLOW ],
			tileOrigin: to.Coordinate([ 50 , 0 ]),
			tileSize: to.Unit(50),
		})).toBe(true)
		expect(standardTileIsColors({
			baseId: baseId += 8,
			colors: [ CYAN, CYAN ],
			tileOrigin: to.Coordinate([ 0 , 50 ]),
			tileSize: to.Unit(50),
		})).toBe(true)
		expect(standardTileIsColors({
			baseId: baseId += 8,
			colors: [ CYAN, YELLOW ],
			tileOrigin: to.Coordinate([ 50 , 50 ]),
			tileSize: to.Unit(50),
		})).toBe(true)
	})
})
