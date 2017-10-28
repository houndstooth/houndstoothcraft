import { to } from '../../../../src'
import { ColorSet } from '../../../../src/components'
import { CYAN, ERASE, TRANSPARENT, YELLOW } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { Color } from '../../../../src/render'
import { Coordinate } from '../../../../src/space'
import { Effect } from '../../../../src/store/types'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { pixelIsColorWithMarker } from '../../helpers/pixelIsColorWithMarker'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'

describe('.layerSettings', () => {
	it('blends colors from semi-translucent layers', () => {
		const houndstoothOverrides: Effect = {
			basePattern: {
				colorSettings: { backgroundColor: YELLOW },
				gridSettings: { gridSize: 2 },
				layerSettings: { endLayer: to.Layer(1) },
				viewSettings: { canvasSize: to.Px(100) },
			},
			layersPattern: {
				colorSettings: {
					backgroundColor: (): Color => CYAN,
					opacity: (): number => 0.25,
				},
			},
		}
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		const BLENDED_COLOR: Color = { r: 192, g: 255, b: 63, a: 1 }
		const pixelInCellThatDemonstratesBlending: Coordinate = to.Coordinate([ 75, 25 ])
		const passed: boolean = pixelIsColorWithMarker({
			coordinateUnderTest: pixelInCellThatDemonstratesBlending,
			expectedColor: BLENDED_COLOR,
			id: 1,
		})
		expect(passed).toBe(true)
	})

	it('erasing makes holes so material from lower layers shows through', () => {
		const houndstoothOverrides: Effect = {
			basePattern: {
				colorSettings: { backgroundColor: YELLOW },
				gridSettings: { gridSize: 0 },
				layerSettings: { endLayer: to.Layer(1) },
				viewSettings: { canvasSize: to.Px(100) },
			},
			layersPattern: {
				colorSettings: {
					backgroundColor: (): Color => CYAN,
					colorSet: (): ColorSet => to.ColorSet([ TRANSPARENT, ERASE ]),
				},
				gridSettings: { gridSize: (): number => 2 },
			},
		}
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		let baseId: number = -8
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
