import composeMainHoundstooth from '../../../src/state/composeMainHoundstooth'
import execute from '../../../src/application/execute'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import pixelIsColor from '../helpers/pixelIsColor'
import { BLACK, TRANSPARENT } from '../../../src/constants'
import standardTileIsColors from '../helpers/standardTileIsColors'
import settingsPaths from '../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'
import tileSectorCenterIsColor from '../helpers/tileSectorCenterIsColor'
import setupCanvas from '../../../src/render/setupCanvas'
import store from '../../../store'
import codeUtilities from '../../../src/utilities/codeUtilities'
import initialState from '../../../src/state/initialState'

describe('.viewSettings', () => {
	const tileSize = getFromBasePatternOrDefault(settingsPaths.TILE_SIZE)
	beforeEach(() => store.currentState = codeUtilities.deepClone(initialState.INITIAL_STATE))

	describe('.canvasSize', () => {
		it('works', () => {
			composeMainHoundstooth({
				houndstoothEffects: [],
				houndstoothOverrides: {
					basePattern: {
						colorSettings: { set: [ BLACK ] },
						viewSettings: { canvasSize: 125 },
					},
				},
			})
			activateTestMarkerCanvas()
			setupCanvas()

			execute()

			expect(pixelIsColor([ 0, 0 ], BLACK)).toBe(true)
			expect(pixelIsColor([ 124, 0 ], BLACK)).toBe(true)
			expect(pixelIsColor([ 0, 124 ], BLACK)).toBe(true)
			expect(pixelIsColor([ 124, 124 ], BLACK)).toBe(true)
			expect(pixelIsColor([ 125, 0 ], TRANSPARENT)).toBe(true)
			expect(pixelIsColor([ 0, 125 ], TRANSPARENT)).toBe(true)
			expect(pixelIsColor([ 125, 125 ], TRANSPARENT)).toBe(true)
		})
	})

	describe('.zoom', () => {
		it('works', () => {
			const zoom = 2
			composeMainHoundstooth({
				houndstoothEffects: [],
				houndstoothOverrides: {
					basePattern: {
						viewSettings: { zoom },
						gridSettings: { gridSize: 2 },
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			expect(standardTileIsColors({
				baseId: 0,
				originInPixels: [ 0 * zoom * tileSize, 0 * zoom * tileSize ],
				tileSizeInPixels: zoom * tileSize,
				colors: [ TRANSPARENT, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				originInPixels: [ 1 * zoom * tileSize, 0 * zoom * tileSize ],
				tileSizeInPixels: zoom * tileSize,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				originInPixels: [ 0 * zoom * tileSize, 1 * zoom * tileSize ],
				tileSizeInPixels: zoom * tileSize,
				colors: [ BLACK, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				originInPixels: [ 1 * zoom * tileSize, 1 * zoom * tileSize ],
				tileSizeInPixels: zoom * tileSize,
				colors: [ BLACK, TRANSPARENT ],
			})).toBe(true)
		})
	})

	describe('.zoomOnCanvasCenter', () => {
		it('leaves the right and bottom quadrants empty if the grid would take up only the top left before zooming, because instead of growing from the origin in the top left it grows away from the center', () => {
			const zoom = 2
			composeMainHoundstooth({
				houndstoothEffects: [],
				houndstoothOverrides: {
					basePattern: {
						viewSettings: {
							zoomOnCanvasCenter: true,
							zoom: 2,
						},
						gridSettings: { gridSize: 8 },
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			expect(standardTileIsColors({
				baseId: 0,
				originInPixels: [ 3 * zoom * tileSize, 3 * zoom * tileSize ],
				tileSizeInPixels: zoom * tileSize,
				colors: [ BLACK, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				originInPixels: [ 3 * zoom * tileSize, 4 * zoom * tileSize ],
				tileSizeInPixels: zoom * tileSize,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				originInPixels: [ 4 * zoom * tileSize, 3 * zoom * tileSize ],
				tileSizeInPixels: zoom * tileSize,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				originInPixels: [ 4 * zoom * tileSize, 4 * zoom * tileSize ],
				tileSizeInPixels: zoom * tileSize,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
		})
	})

	describe('.centerViewOnCenterOfTileAtZeroZeroAddress', () => {
		it('is self-explanatory', () => {
			const tileSize = 100
			composeMainHoundstooth({
				houndstoothEffects: [],
				houndstoothOverrides: {
					basePattern: {
						tileSettings: { tileSize },
						viewSettings: { centerViewOnCenterOfTileAtZeroZeroAddress: true },
						gridSettings: { gridSize: 2 },
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			expect(standardTileIsColors({
				baseId: 0,
				originInPixels: [ 350, 350 ],
				tileSizeInPixels: 100,
				colors: [ TRANSPARENT, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				originInPixels: [ 450, 350 ],
				tileSizeInPixels: 100,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				originInPixels: [ 350, 450 ],
				tileSizeInPixels: 100,
				colors: [ BLACK, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				originInPixels: [ 450, 450 ],
				tileSizeInPixels: 100,
				colors: [ BLACK, TRANSPARENT ],
			})).toBe(true)
		})
	})

	describe('.rotateViewAboutCanvasCenter', () => {
		it('rotates the entire grid about the canvas center', () => {
			composeMainHoundstooth({
				houndstoothEffects: [],
				houndstoothOverrides: {
					basePattern: {
						viewSettings: {
							canvasSize: 300,
							rotateViewAboutCanvasCenter: Math.PI / 2,
						},
						tileSettings: {
							tileSize,
						},
						gridSettings: {
							gridSize: 2,
						},
					},
				},
			})
			activateTestMarkerCanvas()
			execute()

			let originInPixels = [ 200, 0 ]

			expect(tileSectorCenterIsColor({
				id: 1,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 0,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 2,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 0,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 3,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 1,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 4,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 2,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 5,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 1,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 6,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 2,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 7,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 3,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 8,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 3,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)


			originInPixels = [ 250, 0 ]

			expect(tileSectorCenterIsColor({
				id: 9,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 0,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 10,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 0,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 11,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 1,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 12,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 2,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 13,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 1,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 14,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 2,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 15,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 3,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 16,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 3,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			originInPixels = [ 200, 50 ]

			expect(tileSectorCenterIsColor({
				id: 17,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 0,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 18,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 0,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 19,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 1,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 20,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 2,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 21,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 1,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 22,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 2,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 23,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 3,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 24,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 3,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)


			originInPixels = [ 250, 50 ]

			expect(tileSectorCenterIsColor({
				id: 25,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 0,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 26,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 0,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 27,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 1,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 28,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 2,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 29,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 1,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 30,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 2,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 31,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 3,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 32,
				originInPixels,
				tileSizeInPixels: tileSize,
				x: 3,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
		})
	})
})
