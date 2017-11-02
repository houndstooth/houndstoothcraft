import { to } from '../../../../src'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { Context } from '../../../../src/page'
import * as createContext from '../../../../src/page/createContext'
import * as createMixedDownContext from '../../../../src/page/createMixedDownContext'
import { clear } from '../../../../src/render/clear'
import { Effect } from '../../../../src/store/types'
import { buildMockContext } from '../../../helpers/buildMockContext'
import { MockContextCall } from '../../../helpers/types'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'
import { StandardTileExpectation } from '../../helpers/types'

describe('.tileSettings', () => {
	describe('.tileSize', () => {
		it('adjusts the size in pixels of each tile', () => {
			const houndstoothOverrides: Effect = {
				basePattern: {
					tileSettings: {
						tileSize: to.Unit(30),
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let baseId: number = -8
			const tiles: StandardTileExpectation[] = [
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ 0 , 0 ]),
					tileSize: to.Unit(30),
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ 0 , 30 ]),
					tileSize: to.Unit(30),
				},
				{
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ 30 , 0 ]),
					tileSize: to.Unit(30),
				},
				{
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ 30 , 30 ]),
					tileSize: to.Unit(30),
				},
			]
			tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))
		})

		describe('when also zooming', () => {
			it('multiplies the effect of taking up more pixels', () => {
				const houndstoothOverrides: Effect = {
					basePattern: {
						tileSettings: {
							tileSize: to.Unit(30),
						},
						viewSettings: {
							zoom: 3,
						},
					},
				}
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				let baseId: number = -8
				const tiles: StandardTileExpectation[] = [
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, BLACK ],
						tileOrigin: to.Coordinate([ 0 , 0 ]),
						tileSize: to.Unit(90),
					},
					{
						baseId: baseId += 8,
						colors: [ BLACK, BLACK ],
						tileOrigin: to.Coordinate([ 0 , 90 ]),
						tileSize: to.Unit(90),
					},
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 90 , 0 ]),
						tileSize: to.Unit(90),
					},
					{
						baseId: baseId += 8,
						colors: [ BLACK, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 90 , 90 ]),
						tileSize: to.Unit(90),
					},
				]
				tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))
			})
		})
	})

	describe('.collapseSameColoredShapesWithinTile', () => {
		let houndstoothOverrides: Effect
		let context: Context
		let contextCallsOrder: MockContextCall[]
		beforeEach(() => {
			contextCallsOrder = []
			clear()
			houndstoothOverrides = {
				basePattern: {
					colorSettings: { colorSet: to.ColorSet([ BLACK, BLACK ]) },
					gridSettings: { gridSize: 1 },
				},
			}
			context = buildMockContext({ contextCallsOrder })
			spyOn(createContext, 'default').and.returnValue(context)
			spyOn(createMixedDownContext, 'default').and.returnValue(buildMockContext())
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
			houndstoothOverrides = {
				basePattern: {
					colorSettings: { colorSet: to.ColorSet([ BLACK, BLACK ]) },
					gridSettings: { gridSize: 1 },
					tileSettings: { collapseSameColoredShapesWithinTile: false },
				},
			}

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
