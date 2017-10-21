import { to } from '../../../../src'
import { clear } from '../../../../src/canvas/clear'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import * as createContext from '../../../../src/page/createContext'
import * as createMixedDownCanvas from '../../../../src/page/createMixedDownCanvas'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { MockContextMethod } from '../../../types/MockContextMethod'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'

describe('.tileSettings', () => {
	describe('.tileSizeSetting', () => {
		it('adjusts the size in pixels of each tile', () => {
			const houndstoothOverrides = {
				basePattern: {
					tileSettings: {
						tileSizeSetting: to.Units(30),
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let baseId = -8
			const tiles = [
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ 0 , 0 ]),
					tileSize: to.Units(30),
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ 0 , 30 ]),
					tileSize: to.Units(30),
				},
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ 30 , 0 ]),
					tileSize: to.Units(30),
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ 30 , 30 ]),
					tileSize: to.Units(30),
				},
			]
			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})

		describe('when also zooming', () => {
			it('multiplies the effect of taking up more pixels', () => {
				const houndstoothOverrides = {
					basePattern: {
						tileSettings: {
							tileSizeSetting: to.Units(30),
						},
						viewSettings: {
							zoom: 3,
						},
					},
				}
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				let baseId = -8
				const tiles = [
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, BLACK ],
						tileOrigin: to.Coordinate([ 0 , 0 ]),
						tileSize: to.Units(90),
					},
					{
						baseId: baseId += 8,
						colors: [ BLACK, BLACK ],
						tileOrigin: to.Coordinate([ 0 , 90 ]),
						tileSize: to.Units(90),
					},
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 90 , 0 ]),
						tileSize: to.Units(90),
					},
					{
						baseId: baseId += 8,
						colors: [ BLACK, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 90 , 90 ]),
						tileSize: to.Units(90),
					},
				]
				tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
			})
		})
	})

	describe('.collapseSameColoredShapesWithinTile', () => {
		let houndstoothOverrides
		let mockContext
		let contextCallsOrder
		beforeEach(() => {
			contextCallsOrder = []
			clear()
			houndstoothOverrides = {
				basePattern: {
					colorSettings: { colorSet: [ BLACK, BLACK ] },
					gridSettings: { gridSize: 1 },
				},
			}
			mockContext = buildMockContext({ contextCallsOrder })
			spyOn(createContext, 'default').and.returnValue(mockContext)
			spyOn(createMixedDownCanvas, 'default').and.returnValue(buildMockContext())
		})

		it('defaults to true, causing tiles whose stripes are the same color to merge into single solid shape', () => {
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(contextCallsOrder.length).toBe(7)
			expect(contextCallsOrder[ 0 ].method).toBe(MockContextMethod.BeginPath)
			expect(contextCallsOrder[ 1 ].method).toBe(MockContextMethod.MoveTo)
			expect(contextCallsOrder[ 2 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 3 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 4 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 5 ].method).toBe(MockContextMethod.ClosePath)
			expect(contextCallsOrder[ 6 ].method).toBe(MockContextMethod.Fill)
		})

		it('when set to false, causes the shapes to be rendered separately', () => {
			houndstoothOverrides.basePattern.tileSettings = { collapseSameColoredShapesWithinTile: false }
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(contextCallsOrder.length).toBe(26)

			expect(contextCallsOrder[ 0 ].method).toBe(MockContextMethod.BeginPath)
			expect(contextCallsOrder[ 1 ].method).toBe(MockContextMethod.MoveTo)
			expect(contextCallsOrder[ 2 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 3 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 4 ].method).toBe(MockContextMethod.ClosePath)
			expect(contextCallsOrder[ 5 ].method).toBe(MockContextMethod.Fill)

			expect(contextCallsOrder[ 6 ].method).toBe(MockContextMethod.BeginPath)
			expect(contextCallsOrder[ 7 ].method).toBe(MockContextMethod.MoveTo)
			expect(contextCallsOrder[ 8 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 9 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 10 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 11 ].method).toBe(MockContextMethod.ClosePath)
			expect(contextCallsOrder[ 12 ].method).toBe(MockContextMethod.Fill)

			expect(contextCallsOrder[ 13 ].method).toBe(MockContextMethod.BeginPath)
			expect(contextCallsOrder[ 14 ].method).toBe(MockContextMethod.MoveTo)
			expect(contextCallsOrder[ 15 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 16 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 17 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 18 ].method).toBe(MockContextMethod.ClosePath)
			expect(contextCallsOrder[ 19 ].method).toBe(MockContextMethod.Fill)

			expect(contextCallsOrder[ 20 ].method).toBe(MockContextMethod.BeginPath)
			expect(contextCallsOrder[ 21 ].method).toBe(MockContextMethod.MoveTo)
			expect(contextCallsOrder[ 22 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 23 ].method).toBe(MockContextMethod.LineTo)
			expect(contextCallsOrder[ 24 ].method).toBe(MockContextMethod.ClosePath)
			expect(contextCallsOrder[ 25 ].method).toBe(MockContextMethod.Fill)
		})
	})
})
