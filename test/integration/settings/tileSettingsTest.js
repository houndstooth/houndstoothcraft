import '../../../node_modules/canteen/build/canteen.min'
import executeSelectedHoundstoothEffects from '../../../src/execute/executeSelectedHoundstoothEffects'
import standardTileIsColors from '../helpers/standardTileIsColors'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../../src/constants'
import clear from '../../../src/canvas/clear'
import state from '../../../state'

describe('.tileSettings', () => {
	describe('.tileSizeSetting', () => {
		it('adjusts the size in pixels of each tile', () => {
			const houndstoothOverrides = {
				basePattern: {
					tileSettings: {
						tileSizeSetting: 30,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const tiles = [
				{ baseId: 0, originInPixels: [ 0, 0 ], tileSizeInPixels: 30, colors: [ TRANSPARENT, BLACK ] },
				{ baseId: 8, originInPixels: [ 0, 30 ], tileSizeInPixels: 30, colors: [ BLACK, BLACK ] },
				{ baseId: 16, originInPixels: [ 30, 0 ], tileSizeInPixels: 30, colors: [ TRANSPARENT, TRANSPARENT ] },
				{ baseId: 24, originInPixels: [ 30, 30 ], tileSizeInPixels: 30, colors: [ BLACK, TRANSPARENT ] },
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
							tileSizeSetting: 30,
						},
					},
				}
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				const tiles = [
					{ baseId: 0, originInPixels: [ 0, 0 ], tileSizeInPixels: 90, colors: [ TRANSPARENT, BLACK ] },
					{ baseId: 8, originInPixels: [ 0, 90 ], tileSizeInPixels: 90, colors: [ BLACK, BLACK ] },
					{
						baseId: 16,
						originInPixels: [ 90, 0 ],
						tileSizeInPixels: 90,
						colors: [ TRANSPARENT, TRANSPARENT ],
					},
					{ baseId: 24, originInPixels: [ 90, 90 ], tileSizeInPixels: 90, colors: [ BLACK, TRANSPARENT ] },
				]
				tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
			})
		})
	})

	describe('.collapseSameColoredShapesWithinTile', () => {
		let houndstoothOverrides
		beforeEach(() => {
			clear()
			houndstoothOverrides = {
				basePattern: {
					gridSettings: { gridSize: 1 },
					colorSettings: { colorSet: [ BLACK, BLACK ] },
				},
			}
		})

		it('defaults to true, causing tiles whose stripes are the same color to merge into single solid shape', () => {
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let contextCallStack = state.contexts[0].stack()
			expect(contextCallStack.length).toBe(9)
			expect(contextCallStack[ 0 ].attr).toBe('globalCompositeOperation')
			expect(contextCallStack[ 1 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 2 ].method).toBe('beginPath')
			expect(contextCallStack[ 3 ].method).toBe('moveTo')
			expect(contextCallStack[ 4 ].method).toBe('lineTo')
			expect(contextCallStack[ 5 ].method).toBe('lineTo')
			expect(contextCallStack[ 6 ].method).toBe('lineTo')
			expect(contextCallStack[ 7 ].method).toBe('closePath')
			expect(contextCallStack[ 8 ].method).toBe('fill')
		})

		it('when set to false, causes the shapes to be rendered separately', () => {
			houndstoothOverrides.basePattern.tileSettings = { collapseSameColoredShapesWithinTile: false }
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let contextCallStack = state.contexts[0].stack()
			expect(contextCallStack.length).toBe(34)

			expect(contextCallStack[ 0 ].attr).toBe('globalCompositeOperation')
			expect(contextCallStack[ 1 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 2 ].method).toBe('beginPath')
			expect(contextCallStack[ 3 ].method).toBe('moveTo')
			expect(contextCallStack[ 4 ].method).toBe('lineTo')
			expect(contextCallStack[ 5 ].method).toBe('lineTo')
			expect(contextCallStack[ 6 ].method).toBe('closePath')
			expect(contextCallStack[ 7 ].method).toBe('fill')

			expect(contextCallStack[ 8 ].attr).toBe('globalCompositeOperation')
			expect(contextCallStack[ 9 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 10 ].method).toBe('beginPath')
			expect(contextCallStack[ 11 ].method).toBe('moveTo')
			expect(contextCallStack[ 12 ].method).toBe('lineTo')
			expect(contextCallStack[ 13 ].method).toBe('lineTo')
			expect(contextCallStack[ 14 ].method).toBe('lineTo')
			expect(contextCallStack[ 15 ].method).toBe('closePath')
			expect(contextCallStack[ 16 ].method).toBe('fill')

			expect(contextCallStack[ 17 ].attr).toBe('globalCompositeOperation')
			expect(contextCallStack[ 18 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 19 ].method).toBe('beginPath')
			expect(contextCallStack[ 20 ].method).toBe('moveTo')
			expect(contextCallStack[ 21 ].method).toBe('lineTo')
			expect(contextCallStack[ 22 ].method).toBe('lineTo')
			expect(contextCallStack[ 23 ].method).toBe('lineTo')
			expect(contextCallStack[ 24 ].method).toBe('closePath')
			expect(contextCallStack[ 25 ].method).toBe('fill')

			expect(contextCallStack[ 26 ].attr).toBe('globalCompositeOperation')
			expect(contextCallStack[ 27 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 28 ].method).toBe('beginPath')
			expect(contextCallStack[ 29 ].method).toBe('moveTo')
			expect(contextCallStack[ 30 ].method).toBe('lineTo')
			expect(contextCallStack[ 31 ].method).toBe('lineTo')
			expect(contextCallStack[ 32 ].method).toBe('closePath')
			expect(contextCallStack[ 33 ].method).toBe('fill')
		})
	})
})
