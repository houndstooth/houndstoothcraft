import composeMainHoundstooth from '../../../src/store/composeMainHoundstooth'
import execute from '../../../src/application/execute'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import standardTileIsColors from '../helpers/standardTileIsColors'
import { BLACK, TRANSPARENT, WHITE } from '../../../src/constants'
import settingsPaths from '../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'

describe('.gridSettings', () => {
	const tileSizeInPixels = getFromBasePatternOrDefault(settingsPaths.TILE_SIZE)

	describe('.gridSize', () => {
		it('changes how many tiles there are', () => {
			composeMainHoundstooth({
				houndstoothEffects: [],
				houndstoothOverrides: {
					basePattern: {
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
			const tileSizeSetting = 50
			composeMainHoundstooth({
				houndstoothEffects: [],
				houndstoothOverrides: {
					basePattern: {
						viewSettings: {
							canvasSize: 300,
							centerViewOnCenterOfTileAtZeroZeroAddress: true,
						},
						tileSettings: {
							tileSizeSetting,
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
				{
					baseId: 0,
					originInPixels: [ 125, 125 ],
					tileSizeInPixels: tileSizeSetting,
					colors: [ TRANSPARENT, BLACK ],
				},
				{
					baseId: 8,
					originInPixels: [ 75, 125 ],
					tileSizeInPixels: tileSizeSetting,
					colors: [ TRANSPARENT, TRANSPARENT ],
				},
				{
					baseId: 24,
					originInPixels: [ 75, 75 ],
					tileSizeInPixels: tileSizeSetting,
					colors: [ BLACK, TRANSPARENT ],
				},
				{
					baseId: 16,
					originInPixels: [ 125, 75 ],
					tileSizeInPixels: tileSizeSetting,
					colors: [ BLACK, BLACK ],
				},
			]
			tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
		})
	})
})