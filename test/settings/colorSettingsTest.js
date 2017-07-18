import setup from '../../src/application/setup'
import execute from '../../src/application/execute'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import pixelIsColorWithMarker from '../helpers/pixelIsColorWithMarker'
import { BLACK, YELLOW, BLUE, CYAN } from '../../src/constants'
import { TILE_SIZE } from '../../src/defaults'
import standardTileIsColors from '../helpers/standardTileIsColors'
import codeUtilities from '../../src/utilities/codeUtilities'

describe('.colorSettings', () => {
	describe('.set', () => {
		it('lets you change the colors of the pattern', () => {
			const sufficientTileCountToDemonstrateSetting = 2
			setup({
				effects: [],
				overrides: {
					initial: {
						colorSettings: {
							set: [ YELLOW, BLUE ],
						},
						gridSettings: {
							gridSize: sufficientTileCountToDemonstrateSetting ,
						},
						viewSettings: {
							canvasSize: TILE_SIZE * sufficientTileCountToDemonstrateSetting,
						},
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			expect(pixelIsColorWithMarker([ 25, 75 ], YELLOW, 1)).toBe(true)
			expect(pixelIsColorWithMarker([ 75, 25 ], BLUE, 2)).toBe(true)
		})

		it('works for more than two colors', () => {
			const sufficientTileCountToDemonstrateSetting = 3
			const simplestWeaveToDemonstrateSetting = [ 0, 1, 2 ]
			const tileSizeInPixels = TILE_SIZE
			setup({
				effects: [],
				overrides: {
					initial: {
						colorSettings: {
							set: [ YELLOW, BLUE, CYAN ],
							assignment: {
								assignmentMode: 'WEAVE',
								weave: {
									rows: simplestWeaveToDemonstrateSetting,
									columns: simplestWeaveToDemonstrateSetting,
								},
							},
						},
						gridSettings: {
							gridSize: sufficientTileCountToDemonstrateSetting,
						},
						viewSettings: {
							canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting,
						},
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			expect(standardTileIsColors({ baseId: 0, originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ], tileSizeInPixels, colors: [ YELLOW, YELLOW ] })).toBe(true)
			expect(standardTileIsColors({ baseId: 8, originInPixels: [ 1 * tileSizeInPixels, 0 * tileSizeInPixels ], tileSizeInPixels, colors: [ YELLOW, BLUE ] })).toBe(true)
			expect(standardTileIsColors({ baseId: 16, originInPixels: [ 2 * tileSizeInPixels, 0 * tileSizeInPixels ], tileSizeInPixels, colors: [ YELLOW, CYAN ] })).toBe(true)

			expect(standardTileIsColors({ baseId: 24, originInPixels: [ 0 * tileSizeInPixels, 1 * tileSizeInPixels ], tileSizeInPixels, colors: [ BLUE, YELLOW ] })).toBe(true)
			expect(standardTileIsColors({ baseId: 32, originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ], tileSizeInPixels, colors: [ BLUE, BLUE ] })).toBe(true)
			expect(standardTileIsColors({ baseId: 40, originInPixels: [ 2 * tileSizeInPixels, 1 * tileSizeInPixels ], tileSizeInPixels, colors: [ BLUE, CYAN ] })).toBe(true)

			expect(standardTileIsColors({ baseId: 48, originInPixels: [ 0 * tileSizeInPixels, 2 * tileSizeInPixels ], tileSizeInPixels, colors: [ CYAN, YELLOW ] })).toBe(true)
			expect(standardTileIsColors({ baseId: 56, originInPixels: [ 1 * tileSizeInPixels, 2 * tileSizeInPixels ], tileSizeInPixels, colors: [ CYAN, BLUE ] })).toBe(true)
			expect(standardTileIsColors({ baseId: 64, originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ], tileSizeInPixels, colors: [ CYAN, CYAN ] })).toBe(true)
		})
	})

	describe('.assignment', () => {
		describe('.assignmentMode', () => {
			describe('weave', () => {
				xit('is the simplest way to describe a pattern whose colors do not vary within its rows and columns', () => {

				})
			})

			describe('supertile', () => {
				xit('assigns colors to tiles of patterns in any arbitrary way, repeating in a supertile of n by n tiles', () => {

				})
			})
		})

		describe('.switcheroo', () => {
			xit('causes the pattern to turn into strung along teeth flipping directions', () => {

			})
		})

		describe('.flipGrain', () => {
			xit('rotates the stripes by 180 degrees, in effect reversing the grain of the pattern', () => {

			})
		})
	})

	describe('.opacity', () => {
		it('affects the alpha of the pixels rendered', () => {
			const sufficientTileCountToDemonstrateSetting = 2
			const opacity = 0.5
			setup({
				effects: [],
				overrides: {
					initial: {
						colorSettings: {
							set: [ BLACK, BLUE ],
							opacity,
						},
						gridSettings: {
							gridSize: sufficientTileCountToDemonstrateSetting ,
						},
						viewSettings: {
							canvasSize: TILE_SIZE * sufficientTileCountToDemonstrateSetting,
						},
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			const partiallySeeThroughBlack = codeUtilities.deepClone(BLACK)
			partiallySeeThroughBlack.a *= opacity
			const partiallySeeThroughBlue = codeUtilities.deepClone(BLUE)
			partiallySeeThroughBlue.a *= opacity

			expect(pixelIsColorWithMarker([ 25, 75 ], partiallySeeThroughBlack, 1)).toBe(true)
			expect(pixelIsColorWithMarker([ 75, 25 ], partiallySeeThroughBlue, 2)).toBe(true)
		})
	})
})
