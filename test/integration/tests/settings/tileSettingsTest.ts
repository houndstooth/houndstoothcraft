import {
	clear,
	constants,
	Context,
	createContext,
	createMixedDownContext,
	Effect,
	executeSelectedHoundstoothEffects,
	to,
} from '../../../../src'
import { buildMockContext, MockContextCall } from '../../../helpers'
import { activateTestMarkerCanvas, StandardTileExpectation, standardTileIsColors } from '../../helpers'

const { BLACK, TRANSPARENT } = constants

describe('.tileSettings', () => {
	describe('.tileSize', () => {
		it('adjusts the size in pixels of each tile', async (done: DoneFn) => {
			const houndstoothOverrides: Effect = {
				basePattern: {
					tileSettings: {
						tileSize: to.Unit(30),
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects.main({ houndstoothOverrides })

			setTimeout(() => {
				let baseId: number = -8
				const tiles: StandardTileExpectation[] = [
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, BLACK ],
						tileOrigin: to.Coordinate([ 0, 0 ]),
						tileSize: to.Unit(30),
					},
					{
						baseId: baseId += 8,
						colors: [ BLACK, BLACK ],
						tileOrigin: to.Coordinate([ 0, 30 ]),
						tileSize: to.Unit(30),
					},
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 30, 0 ]),
						tileSize: to.Unit(30),
					},
					{
						baseId: baseId += 8,
						colors: [ BLACK, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 30, 30 ]),
						tileSize: to.Unit(30),
					},
				]
				tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))

				done()
			},         0)
		})

		describe('when also zooming', () => {
			it('multiplies the effect of taking up more pixels', async (done: DoneFn) => {
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

				executeSelectedHoundstoothEffects.main({ houndstoothOverrides })

				setTimeout(() => {
					let baseId: number = -8
					const tiles: StandardTileExpectation[] = [
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ 0, 0 ]),
							tileSize: to.Unit(90),
						},
						{
							baseId: baseId += 8,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ 0, 90 ]),
							tileSize: to.Unit(90),
						},
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ 90, 0 ]),
							tileSize: to.Unit(90),
						},
						{
							baseId: baseId += 8,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ 90, 90 ]),
							tileSize: to.Unit(90),
						},
					]
					tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))

					done()
				},         0)
			})
		})
	})

	describe('.collapseSameColoredShapesWithinTile', () => {
		let houndstoothOverrides: Effect
		let context: Context
		let contextCallsOrder: MockContextCall[]
		beforeEach(() => {
			contextCallsOrder = []
			clear.main()
			houndstoothOverrides = {
				basePattern: {
					colorSettings: { colorSet: to.ColorSet([ BLACK, BLACK ]) },
					gridSettings: { tileResolution: 1 },
				},
			}
			context = buildMockContext({ contextCallsOrder })
			spyOn(createContext, 'default').and.returnValue(context)
			spyOn(createMixedDownContext, 'default').and.returnValue(buildMockContext())
		})

		// tslint:disable-next-line:max-line-length
		it('defaults to true, causing tiles whose stripes are the same color to merge into single solid shape', async (done: DoneFn) => {
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects.main({ houndstoothOverrides })

			setTimeout(() => {
				expect(contextCallsOrder.length).toBe(7)
				expect(contextCallsOrder[ 0 ].method).toBe('beginPath')
				expect(contextCallsOrder[ 1 ].method).toBe('moveTo')
				expect(contextCallsOrder[ 2 ].method).toBe('lineTo')
				expect(contextCallsOrder[ 3 ].method).toBe('lineTo')
				expect(contextCallsOrder[ 4 ].method).toBe('lineTo')
				expect(contextCallsOrder[ 5 ].method).toBe('closePath')
				expect(contextCallsOrder[ 6 ].method).toBe('fill')

				done()
			},         0)
		})

		it('when set to false, causes the shapes to be rendered separately', async (done: DoneFn) => {
			houndstoothOverrides = {
				basePattern: {
					colorSettings: { colorSet: to.ColorSet([ BLACK, BLACK ]) },
					gridSettings: { tileResolution: 1 },
					tileSettings: { collapseSameColoredShapesWithinTile: false },
				},
			}

			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects.main({ houndstoothOverrides })

			setTimeout(() => {
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

				done()
			},         0)
		})
	})
})
