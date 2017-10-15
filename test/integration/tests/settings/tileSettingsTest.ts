import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import standardTileIsColors from '../../helpers/standardTileIsColors'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import clear from '../../../../src/canvas/clear'
import buildMockContext from '../../../helpers/buildMockContext'
import * as createContext from '../../../../src/page/createContext'
import * as createMixedDownCanvas from '../../../../src/page/createMixedDownCanvas'
import Coordinate from '../../../../src/space/types/Coordinate'

describe('.tileSettings', () => {
	describe('.tileSizeSetting', () => {
		it('adjusts the size in pixels of each tile', () => {
			const houndstoothOverrides = {
				basePattern: {
					tileSettings: {
						tileSizeSetting: 30 as any,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const tiles = [
				{
					baseId: 0,
					tileOrigin: [ 0 as any, 0 as any ] as Coordinate,
					tileSize: 30 as any,
					colors: [ TRANSPARENT, BLACK ],
				},
				{
					baseId: 8,
					tileOrigin: [ 0 as any, 30 as any ] as Coordinate,
					tileSize: 30 as any,
					colors: [ BLACK, BLACK ],
				},
				{
					baseId: 16,
					tileOrigin: [ 30 as any, 0 as any ] as Coordinate,
					tileSize: 30 as any,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{
					baseId: 24,
					tileOrigin: [ 30 as any, 30 as any ] as Coordinate,
					tileSize: 30 as any,
					colors: [ BLACK, TRANSPARENT ],
				},
			]
			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})

		describe('when also zooming', () => {
			it('multiplies the effect of taking up more pixels', () => {
				const houndstoothOverrides = {
					basePattern: {
						viewSettings: {
							zoom: 3,
						},
						tileSettings: {
							tileSizeSetting: 30 as any,
						},
					},
				}
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				const tiles = [
					{
						baseId: 0,
						tileOrigin: [ 0 as any, 0 as any ] as Coordinate,
						tileSize: 90 as any,
						colors: [ TRANSPARENT, BLACK ],
					},
					{
						baseId: 8,
						tileOrigin: [ 0 as any, 90 as any ] as Coordinate,
						tileSize: 90 as any,
						colors: [ BLACK, BLACK ],
					},
					{
						baseId: 16,
						tileOrigin: [ 90 as any, 0 as any ] as Coordinate,
						tileSize: 90 as any,
						colors: [ TRANSPARENT, TRANSPARENT ],
					},
					{
						baseId: 24,
						tileOrigin: [ 90 as any, 90 as any ] as Coordinate,
						tileSize: 90 as any,
						colors: [ BLACK, TRANSPARENT ],
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
					gridSettings: { gridSize: 1 },
					colorSettings: { colorSet: [ BLACK, BLACK ] },
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
			expect(contextCallsOrder[ 0 ].method).toBe('beginPath')
			expect(contextCallsOrder[ 1 ].method).toBe('moveTo')
			expect(contextCallsOrder[ 2 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 3 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 4 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 5 ].method).toBe('closePath')
			expect(contextCallsOrder[ 6 ].method).toBe('fill')
		})

		it('when set to false, causes the shapes to be rendered separately', () => {
			houndstoothOverrides.basePattern.tileSettings = { collapseSameColoredShapesWithinTile: false }
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(contextCallsOrder.length).toBe(26)

			expect(contextCallsOrder[ 0 ].method).toBe('beginPath')
			expect(contextCallsOrder[ 1 ].method).toBe('moveTo')
			expect(contextCallsOrder[ 2 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 3 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 4 ].method).toBe('closePath')
			expect(contextCallsOrder[ 5 ].method).toBe('fill')

			expect(contextCallsOrder[ 6 ].method).toBe('beginPath')
			expect(contextCallsOrder[ 7 ].method).toBe('moveTo')
			expect(contextCallsOrder[ 8 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 9 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 10 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 11 ].method).toBe('closePath')
			expect(contextCallsOrder[ 12 ].method).toBe('fill')

			expect(contextCallsOrder[ 13 ].method).toBe('beginPath')
			expect(contextCallsOrder[ 14 ].method).toBe('moveTo')
			expect(contextCallsOrder[ 15 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 16 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 17 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 18 ].method).toBe('closePath')
			expect(contextCallsOrder[ 19 ].method).toBe('fill')

			expect(contextCallsOrder[ 20 ].method).toBe('beginPath')
			expect(contextCallsOrder[ 21 ].method).toBe('moveTo')
			expect(contextCallsOrder[ 22 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 23 ].method).toBe('lineTo')
			expect(contextCallsOrder[ 24 ].method).toBe('closePath')
			expect(contextCallsOrder[ 25 ].method).toBe('fill')
		})
	})
})
