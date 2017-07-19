import setup from '../../src/settings/setup'
import execute from '../../src/application/execute'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import tileSectorCenterIsColor from '../helpers/tileSectorCenterIsColor'
import standardTileIsColors from '../helpers/standardTileIsColors'
import { BLACK, TRANSPARENT, WHITE } from '../../src/constants'
import settingsUtilities from '../../src/utilities/settingsUtilities'
import settingsPaths from '../../src/settings/settingsPaths'

describe('.gridSettings', () => {
	const tileSizeInPixels = settingsUtilities.getFromSettingsOrDefault(settingsPaths.TILE_SIZE)

	describe('.gridSize', () => {
		it('changes how many tiles there are', () => {
			setup({
				effects: [],
				overrides: {
					initial: {
						viewSettings: {
							canvasSize: 200,
						},
						colorSettings: {
							set: [ BLACK, WHITE ],
						},
						gridSettings: {
							gridSize: 3,
						},
					},
				},
			})
			activateTestMarkerCanvas()

			execute()

			const tiles = [
				{
					baseId: 0,
					originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ WHITE, BLACK ],
				},
				{
					baseId: 8,
					originInPixels: [ 0 * tileSizeInPixels, 1 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ BLACK, BLACK ],
				},
				{
					baseId: 16,
					originInPixels: [ 0 * tileSizeInPixels, 2 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ WHITE, BLACK ],
				},
				{
					baseId: 24,
					originInPixels: [ 0 * tileSizeInPixels, 3 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},

				{
					baseId: 32,
					originInPixels: [ 1 * tileSizeInPixels, 0 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ WHITE, WHITE ],
				},
				{
					baseId: 40,
					originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ BLACK, WHITE ],
				},
				{
					baseId: 48,
					originInPixels: [ 1 * tileSizeInPixels, 2 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ WHITE, WHITE ],
				},
				{
					baseId: 56,
					originInPixels: [ 1 * tileSizeInPixels, 3 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},

				{
					baseId: 64,
					originInPixels: [ 2 * tileSizeInPixels, 0 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ WHITE, BLACK ],
				},
				{
					baseId: 72,
					originInPixels: [ 2 * tileSizeInPixels, 1 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ BLACK, BLACK ],
				},
				{
					baseId: 80,
					originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ WHITE, BLACK ],
				},
				{
					baseId: 88,
					originInPixels: [ 2 * tileSizeInPixels, 3 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},

				{
					baseId: 96,
					originInPixels: [ 3 * tileSizeInPixels, 0 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{
					baseId: 104,
					originInPixels: [ 3 * tileSizeInPixels, 1 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{
					baseId: 112,
					originInPixels: [ 3 * tileSizeInPixels, 2 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{
					baseId: 120,
					originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
			]

			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})
	})

	describe('.includeNegativeQuadrants', () => {
		it('quadruples the number of tiles, adding them not only in the positive x positive y quadrant, but negative x positive y, positive x negative y, and negative x negative y', () => {
			const tileSize = 50
			setup({
				effects: [],
				overrides: {
					initial: {
						viewSettings: {
							canvasSize: 300,
							centerViewOnCenterOfTileAtZeroZeroAddress: true,
						},
						tileSettings: {
							tileSize,
						},
						gridSettings: {
							gridSize: 1,
							includeNegativeQuadrants: true,
						},
					},
				},
			})
			activateTestMarkerCanvas()
			execute()

			const tiles = [
				{ baseId: 0, originInPixels: [ 125, 125 ], tileSizeInPixels: tileSize, colors: [ TRANSPARENT, BLACK ] },
				{
					baseId: 8,
					originInPixels: [ 75, 125 ],
					tileSizeInPixels: tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{ baseId: 24, originInPixels: [ 75, 75 ], tileSizeInPixels: tileSize, colors: [ BLACK, TRANSPARENT ] },
				{ baseId: 16, originInPixels: [ 125, 75 ], tileSizeInPixels: tileSize, colors: [ BLACK, BLACK ] },
			]
			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})
	})

	describe('.gridRotationAboutCanvasCenter', () => {
		it('rotates the entire grid about the canvas center', () => {
			setup({
				effects: [],
				overrides: {
					initial: {
						viewSettings: {
							canvasSize: 300,
						},
						tileSettings: {
							tileSize: tileSizeInPixels,
						},
						gridSettings: {
							gridSize: 2,
							gridRotationAboutCanvasCenter: Math.PI / 2,
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
				tileSizeInPixels,
				x: 0,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 2,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 3,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 4,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 5,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 6,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 7,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 8,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)


			originInPixels = [ 250, 0 ]

			expect(tileSectorCenterIsColor({
				id: 9,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 10,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 11,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 12,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 13,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 14,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 15,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 16,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			originInPixels = [ 200, 50 ]

			expect(tileSectorCenterIsColor({
				id: 17,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 18,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 1,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 19,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 2,
				n: 4,
				color: BLACK,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 20,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 3,
				n: 4,
				color: BLACK,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 21,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 22,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 23,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 24,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 0,
				n: 4,
				color: BLACK,
			})).toBe(true)


			originInPixels = [ 250, 50 ]

			expect(tileSectorCenterIsColor({
				id: 25,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 26,
				originInPixels,
				tileSizeInPixels,
				x: 0,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 27,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 28,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 3,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 29,
				originInPixels,
				tileSizeInPixels,
				x: 1,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 30,
				originInPixels,
				tileSizeInPixels,
				x: 2,
				y: 1,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
			expect(tileSectorCenterIsColor({
				id: 31,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 2,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)

			expect(tileSectorCenterIsColor({
				id: 32,
				originInPixels,
				tileSizeInPixels,
				x: 3,
				y: 0,
				n: 4,
				color: TRANSPARENT,
			})).toBe(true)
		})
	})
})
