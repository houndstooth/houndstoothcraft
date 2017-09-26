import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import pixelIsColorWithMarker from '../../helpers/pixelIsColorWithMarker'
import { BLACK, BLUE, CYAN, MAGENTA, TRANSPARENT, YELLOW } from '../../../../src/constants'
import standardTileIsColors from '../../helpers/standardTileIsColors'
import { deepClone } from '../../../../src/utilities/codeUtilities'
import { TILE_SIZE } from '../../../helpers/settingsPaths'
import state from '../../../../src/state'
import getFromBasePatternOrDefault from '../../../helpers/getFromBasePatternOrDefault'
import resetState from '../../../../src/store/resetState'

describe('.colorSettings', () => {
	const tileSizeInPixels = getFromBasePatternOrDefault(TILE_SIZE)
	beforeEach(() => resetState(state))

	describe('.colorSet', () => {
		it('lets you change the colors of the pattern', () => {
			const sufficientTileCountToDemonstrateSetting = 2
			const houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: [ YELLOW, BLUE ],
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting,
					},
					viewSettings: {
						canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(pixelIsColorWithMarker({ coordinateUnderTest: [ 25, 75 ], expectedColor: YELLOW, id: 1 })).toBe(true)
			expect(pixelIsColorWithMarker({ coordinateUnderTest: [ 75, 25 ], expectedColor: BLUE, id: 2 })).toBe(true)
		})

		it('works for more than two colors', () => {
			const sufficientTileCountToDemonstrateSetting = 3
			const simplestWeaveToDemonstrateSetting = [ 0, 1, 2 ]
			const houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: [ YELLOW, BLUE, CYAN ],
						assignment: {
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
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(standardTileIsColors({
				baseId: 0,
				originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ YELLOW, YELLOW ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				originInPixels: [ 1 * tileSizeInPixels, 0 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ YELLOW, BLUE ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				originInPixels: [ 2 * tileSizeInPixels, 0 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ YELLOW, CYAN ],
			})).toBe(true)

			expect(standardTileIsColors({
				baseId: 24,
				originInPixels: [ 0 * tileSizeInPixels, 1 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLUE, YELLOW ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 32,
				originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLUE, BLUE ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 40,
				originInPixels: [ 2 * tileSizeInPixels, 1 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ BLUE, CYAN ],
			})).toBe(true)

			expect(standardTileIsColors({
				baseId: 48,
				originInPixels: [ 0 * tileSizeInPixels, 2 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ CYAN, YELLOW ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 56,
				originInPixels: [ 1 * tileSizeInPixels, 2 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ CYAN, BLUE ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 64,
				originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ],
				tileSizeInPixels,
				colors: [ CYAN, CYAN ],
			})).toBe(true)
		})
	})

	describe('.assignment', () => {
		describe('.assignmentMode', () => {
			describe('weave', () => {
				it('is the simplest way to describe a pattern whose colors do not vary within its rows and columns', () => {
					const sufficientTileCountToDemonstrateSetting = 8
					const houndstoothOverrides = {
						basePattern: {
							colorSettings: {
								assignment: {
									weave: {
										rows: [ 0, 1, 1, 0 ],
										columns: [ 1, 0, 1 ],
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
					}

					activateTestMarkerCanvas()

					executeSelectedHoundstoothEffects({ houndstoothOverrides })

					const firstSuperweave = [
						{
							baseId: 0,
							originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 8,
							originInPixels: [ 1 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 16,
							originInPixels: [ 2 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 24,
							originInPixels: [ 0 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 32,
							originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 40,
							originInPixels: [ 2 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 48,
							originInPixels: [ 0 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 56,
							originInPixels: [ 1 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 64,
							originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 72,
							originInPixels: [ 0 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 80,
							originInPixels: [ 1 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 88,
							originInPixels: [ 2 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
					]
					const secondSuperweave = [
						{
							baseId: 96,
							originInPixels: [ 3 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 104,
							originInPixels: [ 4 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 112,
							originInPixels: [ 5 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 120,
							originInPixels: [ 3 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 128,
							originInPixels: [ 4 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 136,
							originInPixels: [ 5 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 144,
							originInPixels: [ 3 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 152,
							originInPixels: [ 4 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 160,
							originInPixels: [ 5 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 168,
							originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 176,
							originInPixels: [ 4 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 184,
							originInPixels: [ 5 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
					]
					const thirdSuperweave = [
						{
							baseId: 192,
							originInPixels: [ 0 * tileSizeInPixels, 4 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 200,
							originInPixels: [ 1 * tileSizeInPixels, 4 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 208,
							originInPixels: [ 2 * tileSizeInPixels, 4 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 216,
							originInPixels: [ 0 * tileSizeInPixels, 5 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 224,
							originInPixels: [ 1 * tileSizeInPixels, 5 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 232,
							originInPixels: [ 2 * tileSizeInPixels, 5 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 240,
							originInPixels: [ 0 * tileSizeInPixels, 6 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 248,
							originInPixels: [ 1 * tileSizeInPixels, 6 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 256,
							originInPixels: [ 2 * tileSizeInPixels, 6 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 264,
							originInPixels: [ 0 * tileSizeInPixels, 7 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 272,
							originInPixels: [ 1 * tileSizeInPixels, 7 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 280,
							originInPixels: [ 2 * tileSizeInPixels, 7 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
					]
					const fourthSuperweave = [
						{
							baseId: 288,
							originInPixels: [ 3 * tileSizeInPixels, 4 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 296,
							originInPixels: [ 4 * tileSizeInPixels, 4 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 304,
							originInPixels: [ 5 * tileSizeInPixels, 4 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 312,
							originInPixels: [ 3 * tileSizeInPixels, 5 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 320,
							originInPixels: [ 4 * tileSizeInPixels, 5 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 328,
							originInPixels: [ 5 * tileSizeInPixels, 5 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 336,
							originInPixels: [ 3 * tileSizeInPixels, 6 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 344,
							originInPixels: [ 4 * tileSizeInPixels, 6 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 352,
							originInPixels: [ 5 * tileSizeInPixels, 6 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 360,
							originInPixels: [ 3 * tileSizeInPixels, 7 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 368,
							originInPixels: [ 4 * tileSizeInPixels, 7 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 376,
							originInPixels: [ 5 * tileSizeInPixels, 7 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLACK, TRANSPARENT ],
						},
					]
					const tiles = firstSuperweave.concat(secondSuperweave).concat(thirdSuperweave).concat(fourthSuperweave)
					tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
				})
			})

			describe('supertile', () => {
				it('assigns colors to tiles of patterns in any arbitrary way, repeating in a supertile of n by n tiles', () => {
					const sufficientTileCountToDemonstrateSetting = 4
					const houndstoothOverrides = {
						basePattern: {
							colorSettings: {
								colorSet: [ YELLOW, BLUE, CYAN, MAGENTA ],
								assignment: {
									assignmentMode: 'SUPERTILE',
									supertile: [
										[
											[ 2, 0 ],
											[ 0, 1 ],
										],
										[
											[ 1, 2 ],
											[ 3, 3 ],
										],
									],
								},
							},
							gridSettings: {
								gridSize: sufficientTileCountToDemonstrateSetting,
							},
							viewSettings: {
								canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting,
							},
						},
					}

					activateTestMarkerCanvas()

					executeSelectedHoundstoothEffects({ houndstoothOverrides })

					const firstSupertile = [
						{
							baseId: 0,
							originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ CYAN, YELLOW ],
						},
						{
							baseId: 8,
							originInPixels: [ 0 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ YELLOW, BLUE ],
						},
						{
							baseId: 16,
							originInPixels: [ 1 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLUE, CYAN ],
						},
						{
							baseId: 24,
							originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ MAGENTA, MAGENTA ],
						},
					]
					const secondSupertile = [
						{
							baseId: 32,
							originInPixels: [ 2 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ CYAN, YELLOW ],
						},
						{
							baseId: 40,
							originInPixels: [ 2 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ YELLOW, BLUE ],
						},
						{
							baseId: 48,
							originInPixels: [ 3 * tileSizeInPixels, 0 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLUE, CYAN ],
						},
						{
							baseId: 56,
							originInPixels: [ 3 * tileSizeInPixels, 1 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ MAGENTA, MAGENTA ],
						},
					]
					const thirdSupertile = [
						{
							baseId: 64,
							originInPixels: [ 0 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ CYAN, YELLOW ],
						},
						{
							baseId: 72,
							originInPixels: [ 0 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ YELLOW, BLUE ],
						},
						{
							baseId: 80,
							originInPixels: [ 1 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLUE, CYAN ],
						},
						{
							baseId: 88,
							originInPixels: [ 1 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ MAGENTA, MAGENTA ],
						},
					]
					const fourthSupertile = [
						{
							baseId: 96,
							originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ CYAN, YELLOW ],
						},
						{
							baseId: 104,
							originInPixels: [ 2 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ YELLOW, BLUE ],
						},
						{
							baseId: 112,
							originInPixels: [ 3 * tileSizeInPixels, 2 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ BLUE, CYAN ],
						},
						{
							baseId: 120,
							originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ],
							tileSizeInPixels,
							colors: [ MAGENTA, MAGENTA ],
						},
					]
					const tiles = firstSupertile.concat(secondSupertile).concat(thirdSupertile).concat(fourthSupertile)
					tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
				})
			})
		})

		describe('.switcheroo', () => {
			it('causes the two striped tiles to alternate by diagonal rather than rows/columns', () => {
				const sufficientTileCountToDemonstrateSetting = 4
				const houndstoothOverrides = {
					basePattern: {
						colorSettings: {
							assignment: {
								switcheroo: true,
							},
						},
						gridSettings: {
							gridSize: sufficientTileCountToDemonstrateSetting,
						},
						viewSettings: {
							canvasSize: sufficientTileCountToDemonstrateSetting * tileSizeInPixels,
						},
					},
				}

				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				expect(standardTileIsColors({
					baseId: 0,
					originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, BLACK ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 8,
					originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, BLACK ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 16,
					originInPixels: [ 2 * tileSizeInPixels, 2 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, BLACK ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 24,
					originInPixels: [ 3 * tileSizeInPixels, 3 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ TRANSPARENT, BLACK ],
				})).toBe(true)

				expect(standardTileIsColors({
					baseId: 32,
					originInPixels: [ 2 * tileSizeInPixels, 0 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ BLACK, TRANSPARENT ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 40,
					originInPixels: [ 3 * tileSizeInPixels, 1 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ BLACK, TRANSPARENT ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 48,
					originInPixels: [ 0 * tileSizeInPixels, 2 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ BLACK, TRANSPARENT ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 56,
					originInPixels: [ 1 * tileSizeInPixels, 3 * tileSizeInPixels ],
					tileSizeInPixels,
					colors: [ BLACK, TRANSPARENT ],
				})).toBe(true)
			})
		})

		describe('.flipGrain', () => {
			it('rotates the stripes by 180 degrees, in effect (switching the colors if there are only two) reversing the grain of the pattern', () => {
				const sufficientTileCountToDemonstrateSetting = 2
				const houndstoothOverrides = {
					basePattern: {
						colorSettings: {
							assignment: {
								flipGrain: true,
							},
						},
						gridSettings: {
							gridSize: sufficientTileCountToDemonstrateSetting,
						},
						viewSettings: {
							canvasSize: sufficientTileCountToDemonstrateSetting * tileSizeInPixels,
						},
					},
				}
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				const tiles = [
					{
						baseId: 0,
						originInPixels: [ 0 * tileSizeInPixels, 0 * tileSizeInPixels ],
						tileSizeInPixels,
						colors: [ BLACK, TRANSPARENT ],
					},
					{
						baseId: 8,
						originInPixels: [ 0 * tileSizeInPixels, 1 * tileSizeInPixels ],
						tileSizeInPixels,
						colors: [ BLACK, BLACK ],
					},
					{
						baseId: 16,
						originInPixels: [ 1 * tileSizeInPixels, 0 * tileSizeInPixels ],
						tileSizeInPixels,
						colors: [ TRANSPARENT, TRANSPARENT ],
					},
					{
						baseId: 24,
						originInPixels: [ 1 * tileSizeInPixels, 1 * tileSizeInPixels ],
						tileSizeInPixels,
						colors: [ TRANSPARENT, BLACK ],
					},
				]

				tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
			})
		})
	})

	describe('.opacity', () => {
		it('affects the alpha of the pixels rendered', () => {
			const sufficientTileCountToDemonstrateSetting = 2
			const opacity = 0.5
			const houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: [ BLACK, BLUE ],
						opacity,
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting,
					},
					viewSettings: {
						canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const partiallySeeThroughBlack = deepClone(BLACK)
			partiallySeeThroughBlack.a *= opacity
			const partiallySeeThroughBlue = deepClone(BLUE)
			partiallySeeThroughBlue.a *= opacity

			expect(pixelIsColorWithMarker({ coordinateUnderTest: [ 25, 75 ], expectedColor: partiallySeeThroughBlack, id: 1 })).toBe(true)
			expect(pixelIsColorWithMarker({ coordinateUnderTest: [ 75, 25 ], expectedColor: partiallySeeThroughBlue, id: 2 })).toBe(true)
		})
	})

	describe('.backgroundColor', () => {
		it('paints it yellow', () => {
			const sufficientTileCountToDemonstrateSetting = 2
			const houndstoothOverrides = {
				basePattern: {
					colorSettings: {
						colorSet: [ BLACK, TRANSPARENT ],
						backgroundColor: YELLOW,
					},
					gridSettings: {
						gridSize: sufficientTileCountToDemonstrateSetting,
					},
					viewSettings: {
						canvasSize: tileSizeInPixels * sufficientTileCountToDemonstrateSetting,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(pixelIsColorWithMarker({ coordinateUnderTest: [ 75, 25 ], expectedColor: YELLOW, id: 2 })).toBe(true)
		})
	})
})
