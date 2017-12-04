import {
	Color,
	ColorSet,
	constants,
	Coordinate,
	Effect,
	executeSelectedHoundstoothEffects,
	state,
	to,
} from '../../../../src'
import { pixelIsColorWithMarker, standardTileIsColors } from '../../helpers'

const { BLACK, CYAN, ERASE, TRANSPARENT, YELLOW } = constants

describe('.layerSettings', () => {
	it('blends colors from semi-translucent layers', async (done: DoneFn) => {
		const houndstoothOverrides: Effect = {
			basePattern: {
				gridSettings: { tileResolution: 2 },
				layerSettings: { endLayer: to.Layer(1) },
				viewSettings: { canvasSize: to.Px(100) },
			},
			layersPattern: {
				colorSettings: {
					backgroundColor: (): Color => state.execute.currentLayer === to.Layer(0) ? YELLOW : CYAN,
					opacity: (): number => state.execute.currentLayer === to.Layer(0) ? 1 : 0.25,
				},
			},
		}

		executeSelectedHoundstoothEffects.default({ houndstoothOverrides })

		setTimeout(() => {
			const BLENDED_COLOR: Color = { r: 192, g: 255, b: 63, a: 1 }
			const pixelInCellThatDemonstratesBlending: Coordinate = to.Coordinate([ 75, 25 ])
			const passed: boolean = pixelIsColorWithMarker({
				coordinateUnderTest: pixelInCellThatDemonstratesBlending,
				expectedColor: BLENDED_COLOR,
				id: 1,
			})
			expect(passed).toBe(true)

			done()
		},         0)
	})

	it('erasing makes holes so material from lower layers shows through', async (done: DoneFn) => {
		const houndstoothOverrides: Effect = {
			basePattern: {
				gridSettings: { tileResolution: 0 },
				layerSettings: { endLayer: to.Layer(1) },
				viewSettings: { canvasSize: to.Px(100) },
			},
			layersPattern: {
				colorSettings: {
					backgroundColor: (): Color => state.execute.currentLayer === to.Layer(0) ? YELLOW : CYAN,
					colorSet: (): ColorSet => {
						if (state.execute.currentLayer === to.Layer(0)) {
							return to.ColorSet([ BLACK, TRANSPARENT ])
						}
						else {
							return to.ColorSet([ TRANSPARENT, ERASE ])
						}
					},
				},
				gridSettings: { tileResolution: (): number => 2 },
			},
		}

		executeSelectedHoundstoothEffects.default({ houndstoothOverrides })

		setTimeout(() => {
			let baseId: number = -8
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ YELLOW, CYAN ],
				tileOrigin: to.Coordinate([ 0, 0 ]),
				tileSize: to.Unit(50),
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ YELLOW, YELLOW ],
				tileOrigin: to.Coordinate([ 50, 0 ]),
				tileSize: to.Unit(50),
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ CYAN, CYAN ],
				tileOrigin: to.Coordinate([ 0, 50 ]),
				tileSize: to.Unit(50),
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: baseId += 8,
				colors: [ CYAN, YELLOW ],
				tileOrigin: to.Coordinate([ 50, 50 ]),
				tileSize: to.Unit(50),
			})).toBe(true)

			done()
		},         0)
	})
})
