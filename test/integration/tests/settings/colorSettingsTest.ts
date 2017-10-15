import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import pixelIsColorWithMarker from '../../helpers/pixelIsColorWithMarker'
import { BLACK, BLUE, CYAN, MAGENTA, TRANSPARENT, YELLOW } from '../../../../src/constants'
import standardTileIsColors from '../../helpers/standardTileIsColors'
import { deepClone } from '../../../../src/utilities/codeUtilities'
import { TILE_SIZE } from '../../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../../helpers/getFromBasePatternOrDefault'
import CanvasSize from '../../../../src/canvas/types/CanvasSize'
import Supertile from '../../../../src/components/types/Supertile'
import Coordinate from '../../../../src/space/types/Coordinate'

describe('.colorSettings', () => {
	const tileSize = getFromBasePatternOrDefault(TILE_SIZE) as any

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
						canvasSize: tileSize * sufficientTileCountToDemonstrateSetting as CanvasSize,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(pixelIsColorWithMarker({
				coordinateUnderTest: [ 25 as any, 75 as any ] as Coordinate,
				expectedColor: YELLOW,
				id: 1,
			})).toBe(true)
			expect(pixelIsColorWithMarker({
				coordinateUnderTest: [ 75 as any, 25 as any ] as Coordinate,
				expectedColor: BLUE,
				id: 2,
			})).toBe(true)
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
						canvasSize: tileSize * sufficientTileCountToDemonstrateSetting as CanvasSize,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(standardTileIsColors({
				baseId: 0,
				tileOrigin: [ 0 * tileSize as any, 0 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ YELLOW, YELLOW ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				tileOrigin: [ 1 * tileSize as any, 0 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ YELLOW, BLUE ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				tileOrigin: [ 2 * tileSize as any, 0 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ YELLOW, CYAN ],
			})).toBe(true)

			expect(standardTileIsColors({
				baseId: 24,
				tileOrigin: [ 0 * tileSize as any, 1 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLUE, YELLOW ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 32,
				tileOrigin: [ 1 * tileSize as any, 1 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLUE, BLUE ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 40,
				tileOrigin: [ 2 * tileSize as any, 1 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ BLUE, CYAN ],
			})).toBe(true)

			expect(standardTileIsColors({
				baseId: 48,
				tileOrigin: [ 0 * tileSize as any, 2 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ CYAN, YELLOW ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 56,
				tileOrigin: [ 1 * tileSize as any, 2 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ CYAN, BLUE ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 64,
				tileOrigin: [ 2 * tileSize as any, 2 * tileSize as any ] as Coordinate,
				tileSize,
				colors: [ CYAN, CYAN ],
			})).toBe(true)
		})
	})

	describe('.assignment', () => {
		describe('.assignmentMode', () => {
			describe('weave', () => {
				it('is the simplest way to describe a pattern w/ colors not varied w/in its rows and columns', () => {
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
								canvasSize: tileSize * sufficientTileCountToDemonstrateSetting as CanvasSize,
							},
						},
					}

					activateTestMarkerCanvas()

					executeSelectedHoundstoothEffects({ houndstoothOverrides })

					const firstSuperweave = [
						{
							baseId: 0,
							tileOrigin: [ 0 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 8,
							tileOrigin: [ 1 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 16,
							tileOrigin: [ 2 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 24,
							tileOrigin: [ 0 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 32,
							tileOrigin: [ 1 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 40,
							tileOrigin: [ 2 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 48,
							tileOrigin: [ 0 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 56,
							tileOrigin: [ 1 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 64,
							tileOrigin: [ 2 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 72,
							tileOrigin: [ 0 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 80,
							tileOrigin: [ 1 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 88,
							tileOrigin: [ 2 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
					]
					const secondSuperweave = [
						{
							baseId: 96,
							tileOrigin: [ 3 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 104,
							tileOrigin: [ 4 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 112,
							tileOrigin: [ 5 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 120,
							tileOrigin: [ 3 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 128,
							tileOrigin: [ 4 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 136,
							tileOrigin: [ 5 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 144,
							tileOrigin: [ 3 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 152,
							tileOrigin: [ 4 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 160,
							tileOrigin: [ 5 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 168,
							tileOrigin: [ 3 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 176,
							tileOrigin: [ 4 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 184,
							tileOrigin: [ 5 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
					]
					const thirdSuperweave = [
						{
							baseId: 192,
							tileOrigin: [ 0 * tileSize as any, 4 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 200,
							tileOrigin: [ 1 * tileSize as any, 4 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 208,
							tileOrigin: [ 2 * tileSize as any, 4 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 216,
							tileOrigin: [ 0 * tileSize as any, 5 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 224,
							tileOrigin: [ 1 * tileSize as any, 5 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 232,
							tileOrigin: [ 2 * tileSize as any, 5 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 240,
							tileOrigin: [ 0 * tileSize as any, 6 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 248,
							tileOrigin: [ 1 * tileSize as any, 6 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 256,
							tileOrigin: [ 2 * tileSize as any, 6 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 264,
							tileOrigin: [ 0 * tileSize as any, 7 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 272,
							tileOrigin: [ 1 * tileSize as any, 7 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 280,
							tileOrigin: [ 2 * tileSize as any, 7 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
					]
					const fourthSuperweave = [
						{
							baseId: 288,
							tileOrigin: [ 3 * tileSize as any, 4 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 296,
							tileOrigin: [ 4 * tileSize as any, 4 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 304,
							tileOrigin: [ 5 * tileSize as any, 4 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 312,
							tileOrigin: [ 3 * tileSize as any, 5 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 320,
							tileOrigin: [ 4 * tileSize as any, 5 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 328,
							tileOrigin: [ 5 * tileSize as any, 5 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 336,
							tileOrigin: [ 3 * tileSize as any, 6 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 344,
							tileOrigin: [ 4 * tileSize as any, 6 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, BLACK ],
						},
						{
							baseId: 352,
							tileOrigin: [ 5 * tileSize as any, 6 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ TRANSPARENT, TRANSPARENT ],
						},
						{
							baseId: 360,
							tileOrigin: [ 3 * tileSize as any, 7 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
						{
							baseId: 368,
							tileOrigin: [ 4 * tileSize as any, 7 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, BLACK ],
						},
						{
							baseId: 376,
							tileOrigin: [ 5 * tileSize as any, 7 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLACK, TRANSPARENT ],
						},
					]
					const tiles = firstSuperweave
						.concat(secondSuperweave)
						.concat(thirdSuperweave)
						.concat(fourthSuperweave)
					tiles.forEach(tile => expect(standardTileIsColors(tile)).toBe(true))
				})
			})

			describe('supertile', () => {
				// tslint:disable-next-line:max-line-length
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
									] as Supertile,
								},
							},
							gridSettings: {
								gridSize: sufficientTileCountToDemonstrateSetting,
							},
							viewSettings: {
								canvasSize: tileSize * sufficientTileCountToDemonstrateSetting as CanvasSize,
							},
						},
					}

					activateTestMarkerCanvas()

					executeSelectedHoundstoothEffects({ houndstoothOverrides })

					const firstSupertile = [
						{
							baseId: 0,
							tileOrigin: [ 0 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ CYAN, YELLOW ],
						},
						{
							baseId: 8,
							tileOrigin: [ 0 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ YELLOW, BLUE ],
						},
						{
							baseId: 16,
							tileOrigin: [ 1 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLUE, CYAN ],
						},
						{
							baseId: 24,
							tileOrigin: [ 1 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ MAGENTA, MAGENTA ],
						},
					]
					const secondSupertile = [
						{
							baseId: 32,
							tileOrigin: [ 2 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ CYAN, YELLOW ],
						},
						{
							baseId: 40,
							tileOrigin: [ 2 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ YELLOW, BLUE ],
						},
						{
							baseId: 48,
							tileOrigin: [ 3 * tileSize as any, 0 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLUE, CYAN ],
						},
						{
							baseId: 56,
							tileOrigin: [ 3 * tileSize as any, 1 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ MAGENTA, MAGENTA ],
						},
					]
					const thirdSupertile = [
						{
							baseId: 64,
							tileOrigin: [ 0 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ CYAN, YELLOW ],
						},
						{
							baseId: 72,
							tileOrigin: [ 0 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ YELLOW, BLUE ],
						},
						{
							baseId: 80,
							tileOrigin: [ 1 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLUE, CYAN ],
						},
						{
							baseId: 88,
							tileOrigin: [ 1 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ MAGENTA, MAGENTA ],
						},
					]
					const fourthSupertile = [
						{
							baseId: 96,
							tileOrigin: [ 2 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ CYAN, YELLOW ],
						},
						{
							baseId: 104,
							tileOrigin: [ 2 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ YELLOW, BLUE ],
						},
						{
							baseId: 112,
							tileOrigin: [ 3 * tileSize as any, 2 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ BLUE, CYAN ],
						},
						{
							baseId: 120,
							tileOrigin: [ 3 * tileSize as any, 3 * tileSize as any ] as Coordinate,
							tileSize,
							colors: [ MAGENTA, MAGENTA ],
						},
					]
					const tiles = firstSupertile
						.concat(secondSupertile)
						.concat(thirdSupertile)
						.concat(fourthSupertile)
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
							canvasSize: sufficientTileCountToDemonstrateSetting * tileSize as CanvasSize,
						},
					},
				}

				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				expect(standardTileIsColors({
					baseId: 0,
					tileOrigin: [ 0 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, BLACK ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 8,
					tileOrigin: [ 1 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, BLACK ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 16,
					tileOrigin: [ 2 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, BLACK ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 24,
					tileOrigin: [ 3 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, BLACK ],
				})).toBe(true)

				expect(standardTileIsColors({
					baseId: 32,
					tileOrigin: [ 2 * tileSize as any, 0 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ BLACK, TRANSPARENT ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 40,
					tileOrigin: [ 3 * tileSize as any, 1 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ BLACK, TRANSPARENT ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 48,
					tileOrigin: [ 0 * tileSize as any, 2 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ BLACK, TRANSPARENT ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 56,
					tileOrigin: [ 1 * tileSize as any, 3 * tileSize as any ] as Coordinate,
					tileSize,
					colors: [ BLACK, TRANSPARENT ],
				})).toBe(true)
			})
		})

		describe('.flipGrain', () => {
			// tslint:disable-next-line:max-line-length
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
							canvasSize: sufficientTileCountToDemonstrateSetting * tileSize as CanvasSize,
						},
					},
				}
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				const tiles = [
					{
						baseId: 0,
						tileOrigin: [ 0 * tileSize as any, 0 * tileSize as any ] as Coordinate,
						tileSize,
						colors: [ BLACK, TRANSPARENT ],
					},
					{
						baseId: 8,
						tileOrigin: [ 0 * tileSize as any, 1 * tileSize as any ] as Coordinate,
						tileSize,
						colors: [ BLACK, BLACK ],
					},
					{
						baseId: 16,
						tileOrigin: [ 1 * tileSize as any, 0 * tileSize as any ] as Coordinate,
						tileSize,
						colors: [ TRANSPARENT, TRANSPARENT ],
					},
					{
						baseId: 24,
						tileOrigin: [ 1 * tileSize as any, 1 * tileSize as any ] as Coordinate,
						tileSize,
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
						canvasSize: tileSize * sufficientTileCountToDemonstrateSetting as CanvasSize,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const partiallySeeThroughBlack = deepClone(BLACK)
			partiallySeeThroughBlack.a *= opacity
			const partiallySeeThroughBlue = deepClone(BLUE)
			partiallySeeThroughBlue.a *= opacity

			const semiBlackPixel = {
				coordinateUnderTest: [ 25 as any, 75 as any ] as Coordinate,
				expectedColor: partiallySeeThroughBlack,
				id: 1,
			}
			expect(pixelIsColorWithMarker(semiBlackPixel)).toBe(true)
			const semiBluePixel = {
				coordinateUnderTest: [ 75 as any, 25 as any ] as Coordinate,
				expectedColor: partiallySeeThroughBlue,
				id: 2,
			}
			expect(pixelIsColorWithMarker(semiBluePixel)).toBe(true)
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
						canvasSize: tileSize * sufficientTileCountToDemonstrateSetting as CanvasSize,
					},
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			const yellowPixel = {
				coordinateUnderTest: [ 75 as any, 25 as any ] as Coordinate,
				expectedColor: YELLOW,
				id: 2,
			}
			expect(pixelIsColorWithMarker(yellowPixel)).toBe(true)
		})
	})
})
