import { CanvasSize } from '../../../../src/canvas/types/CanvasSize'
import { CYAN, ERASE, TRANSPARENT, YELLOW } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { Coordinate } from '../../../../src/space/types/Coordinate'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { pixelIsColorWithMarker } from '../../helpers/pixelIsColorWithMarker'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'

describe('.layerSettings', () => {
	it('blends colors from semi-translucent layers', () => {
		const houndstoothOverrides = {
			basePattern: {
				colorSettings: { backgroundColor: YELLOW },
				gridSettings: { gridSize: 2 },
				layerSettings: { endLayer: 1 },
				viewSettings: { canvasSize: 100 as CanvasSize },
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
		const pixelInCellThatDemonstratesBlending = [ 75 as any, 25 as any ] as Coordinate
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
				layerSettings: { endLayer: 1 },
				viewSettings: { canvasSize: 100 as CanvasSize },
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
			tileOrigin: [ 0 as any, 0 as any ] as Coordinate,
			tileSize: 50 as any,
		})).toBe(true)
		expect(standardTileIsColors({
			baseId: baseId += 8,
			colors: [ YELLOW, YELLOW ],
			tileOrigin: [ 50 as any, 0 as any ] as Coordinate,
			tileSize: 50 as any,
		})).toBe(true)
		expect(standardTileIsColors({
			baseId: baseId += 8,
			colors: [ CYAN, CYAN ],
			tileOrigin: [ 0 as any, 50 as any ] as Coordinate,
			tileSize: 50 as any,
		})).toBe(true)
		expect(standardTileIsColors({
			baseId: baseId += 8,
			colors: [ CYAN, YELLOW ],
			tileOrigin: [ 50 as any, 50 as any ] as Coordinate,
			tileSize: 50 as any,
		})).toBe(true)
	})
})
