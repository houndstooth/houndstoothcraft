import execute from '../../src/application/execute'
import setup from '../../src/application/setup'
import standardTileIsColors from '../helpers/standardTileIsColors'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import { BLACK, TRANSPARENT } from '../../src/constants'

describe('.tileSettings', () => {
	describe('.tileSize', () => {
		it('adjusts the size in pixels of each tile', () => {
			setup({
				effects: [],
				overrides: {
					initial: {
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
				setup({
					effects: [],
					overrides: {
						initial: {
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
					{ baseId: 16, originInPixels: [ 90, 0 ], tileSizeInPixels: 90, colors: [ TRANSPARENT, TRANSPARENT ] },
					{ baseId: 24, originInPixels: [ 90, 90 ], tileSizeInPixels: 90, colors: [ BLACK, TRANSPARENT ] },
				]
				tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
			})
		})
	})

	xdescribe('.collapseSameColoredShapesWithinTile', () => { //this one will require bringing back that stack looker

	})

	xdescribe('.isTileUniform', () => {

	})

	xdescribe('.tileToShapes', () => {

	})

	xdescribe('.getCoordinates', () => {
		// whenTileIsUniform
		// whenTileIsMultiform
	})
})
