import '../../node_modules/canteen/build/canteen.min'
import execute from '../../src/application/execute'
import buildPattern from '../../src/state/buildPattern'
import standardTileIsColors from '../helpers/standardTileIsColors'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../src/constants'
import context from '../../src/render/context'

describe('.tileSettings', () => {
	describe('.tileSize', () => {
		it('adjusts the size in pixels of each tile', () => {
			buildPattern({
				patternEffects: [],
				patternOverrides: {
					base: {
						tileSettings: {
							tileSize: 30,
						},
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

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
				buildPattern({
					patternEffects: [],
					patternOverrides: {
						base: {
							viewSettings: {
								zoom: 3,
							},
							tileSettings: {
								tileSize: 30,
							},
						},
					},
				})
				activateTestMarkerCanvas()

				execute()

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
		let patternOverrides
		beforeEach(() => {
			context.clear()
			patternOverrides = {
				base: {
					gridSettings: { gridSize: 1 },
					colorSettings: { set: [ BLACK, BLACK ] },
				},
			}
		})

		it('defaults to true, causing tiles whose stripes are the same color to merge into single solid shape', () => {
			buildPattern({ patternEffects: [], patternOverrides })
			activateTestMarkerCanvas()

			execute()

			let contextCallStack = context.stack()
			expect(contextCallStack.length).toBe(8)
			expect(contextCallStack[ 0 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 1 ].method).toBe('beginPath')
			expect(contextCallStack[ 2 ].method).toBe('moveTo')
			expect(contextCallStack[ 3 ].method).toBe('lineTo')
			expect(contextCallStack[ 4 ].method).toBe('lineTo')
			expect(contextCallStack[ 5 ].method).toBe('lineTo')
			expect(contextCallStack[ 6 ].method).toBe('closePath')
			expect(contextCallStack[ 7 ].method).toBe('fill')
		})

		it('when set to false, causes the shapes to be rendered separately', () => {
			patternOverrides.base.tileSettings = { collapseSameColoredShapesWithinTile: false }
			buildPattern({ patternEffects: [], patternOverrides })
			activateTestMarkerCanvas()

			execute()

			let contextCallStack = context.stack()
			expect(contextCallStack.length).toBe(30)

			expect(contextCallStack[ 0 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 1 ].method).toBe('beginPath')
			expect(contextCallStack[ 2 ].method).toBe('moveTo')
			expect(contextCallStack[ 3 ].method).toBe('lineTo')
			expect(contextCallStack[ 4 ].method).toBe('lineTo')
			expect(contextCallStack[ 5 ].method).toBe('closePath')
			expect(contextCallStack[ 6 ].method).toBe('fill')

			expect(contextCallStack[ 7 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 8 ].method).toBe('beginPath')
			expect(contextCallStack[ 9 ].method).toBe('moveTo')
			expect(contextCallStack[ 10 ].method).toBe('lineTo')
			expect(contextCallStack[ 11 ].method).toBe('lineTo')
			expect(contextCallStack[ 12 ].method).toBe('lineTo')
			expect(contextCallStack[ 13 ].method).toBe('closePath')
			expect(contextCallStack[ 14 ].method).toBe('fill')

			expect(contextCallStack[ 15 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 16 ].method).toBe('beginPath')
			expect(contextCallStack[ 17 ].method).toBe('moveTo')
			expect(contextCallStack[ 18 ].method).toBe('lineTo')
			expect(contextCallStack[ 19 ].method).toBe('lineTo')
			expect(contextCallStack[ 20 ].method).toBe('lineTo')
			expect(contextCallStack[ 21 ].method).toBe('closePath')
			expect(contextCallStack[ 22 ].method).toBe('fill')

			expect(contextCallStack[ 23 ].attr).toBe('fillStyle')
			expect(contextCallStack[ 24 ].method).toBe('beginPath')
			expect(contextCallStack[ 25 ].method).toBe('moveTo')
			expect(contextCallStack[ 26 ].method).toBe('lineTo')
			expect(contextCallStack[ 27 ].method).toBe('lineTo')
			expect(contextCallStack[ 28 ].method).toBe('closePath')
			expect(contextCallStack[ 29 ].method).toBe('fill')
		})
	})
})
