import CanvasSize from '../../../../src/canvas/types/CanvasSize'
import Supertile from '../../../../src/components/types/Supertile'
import { BLACK, BLUE, CYAN, MAGENTA, TRANSPARENT, YELLOW } from '../../../../src/constants'
import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { AssignmentMode } from '../../../../src/index'
import Coordinate from '../../../../src/space/types/Coordinate'
import { deepClone } from '../../../../src/utilities/codeUtilities'
import getFromBasePatternOrDefault from '../../../helpers/getFromBasePatternOrDefault'
import { TILE_SIZE } from '../../../helpers/settingsPaths'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import pixelIsColorWithMarker from '../../helpers/pixelIsColorWithMarker'
import standardTileIsColors from '../../helpers/standardTileIsColors'

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
						assignment: {
							weave: {
								columns: simplestWeaveToDemonstrateSetting,
								rows: simplestWeaveToDemonstrateSetting,
							},
						},
						colorSet: [ YELLOW, BLUE, CYAN ],
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
				colors: [ YELLOW, YELLOW ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				colors: [ YELLOW, BLUE ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				colors: [ YELLOW, CYAN ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 0 as any ] as Coordinate,
				tileSize,
			})).toBe(true)

			expect(standardTileIsColors({
				baseId: 24,
				colors: [ BLUE, YELLOW ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 32,
				colors: [ BLUE, BLUE ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 40,
				colors: [ BLUE, CYAN ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 1 as any ] as Coordinate,
				tileSize,
			})).toBe(true)

			expect(standardTileIsColors({
				baseId: 48,
				colors: [ CYAN, YELLOW ],
				tileOrigin: [ tileSize * 0 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 56,
				colors: [ CYAN, BLUE ],
				tileOrigin: [ tileSize * 1 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 64,
				colors: [ CYAN, CYAN ],
				tileOrigin: [ tileSize * 2 as any, tileSize * 2 as any ] as Coordinate,
				tileSize,
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
										columns: [ 1, 0, 1 ],
										rows: [ 0, 1, 1, 0 ],
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
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 8,
							colors: [ BLACK, BLACK ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 16,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 24,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 32,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 40,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 48,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 56,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 64,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 72,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 80,
							colors: [ BLACK, BLACK ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 88,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
						},
					]
					const secondSuperweave = [
						{
							baseId: 96,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 104,
							colors: [ BLACK, BLACK ],
							tileOrigin: [ tileSize * 4 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 112,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 5 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 120,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 128,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: [ tileSize * 4 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 136,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 5 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 144,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 152,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: [ tileSize * 4 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 160,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 5 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 168,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 176,
							colors: [ BLACK, BLACK ],
							tileOrigin: [ tileSize * 4 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 184,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 5 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
						},
					]
					const thirdSuperweave = [
						{
							baseId: 192,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 4 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 200,
							colors: [ BLACK, BLACK ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 4 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 208,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 4 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 216,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 5 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 224,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 5 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 232,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 5 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 240,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 6 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 248,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 6 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 256,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 6 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 264,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 7 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 272,
							colors: [ BLACK, BLACK ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 7 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 280,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 7 as any ] as Coordinate,
							tileSize,
						},
					]
					const fourthSuperweave = [
						{
							baseId: 288,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 4 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 296,
							colors: [ BLACK, BLACK ],
							tileOrigin: [ tileSize * 4 as any, tileSize * 4 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 304,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 5 as any, tileSize * 4 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 312,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 5 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 320,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: [ tileSize * 4 as any, tileSize * 5 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 328,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 5 as any, tileSize * 5 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 336,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 6 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 344,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: [ tileSize * 4 as any, tileSize * 6 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 352,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: [ tileSize * 5 as any, tileSize * 6 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 360,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 7 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 368,
							colors: [ BLACK, BLACK ],
							tileOrigin: [ tileSize * 4 as any, tileSize * 7 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 376,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: [ tileSize * 5 as any, tileSize * 7 as any ] as Coordinate,
							tileSize,
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
								assignment: {
									assignmentMode: AssignmentMode.SUPERTILE,
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
								colorSet: [ YELLOW, BLUE, CYAN, MAGENTA ],
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
							colors: [ CYAN, YELLOW ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 8,
							colors: [ YELLOW, BLUE ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 16,
							colors: [ BLUE, CYAN ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 24,
							colors: [ MAGENTA, MAGENTA ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
					]
					const secondSupertile = [
						{
							baseId: 32,
							colors: [ CYAN, YELLOW ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 40,
							colors: [ YELLOW, BLUE ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 48,
							colors: [ BLUE, CYAN ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 0 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 56,
							colors: [ MAGENTA, MAGENTA ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 1 as any ] as Coordinate,
							tileSize,
						},
					]
					const thirdSupertile = [
						{
							baseId: 64,
							colors: [ CYAN, YELLOW ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 72,
							colors: [ YELLOW, BLUE ],
							tileOrigin: [ tileSize * 0 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 80,
							colors: [ BLUE, CYAN ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 88,
							colors: [ MAGENTA, MAGENTA ],
							tileOrigin: [ tileSize * 1 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
						},
					]
					const fourthSupertile = [
						{
							baseId: 96,
							colors: [ CYAN, YELLOW ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 104,
							colors: [ YELLOW, BLUE ],
							tileOrigin: [ tileSize * 2 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 112,
							colors: [ BLUE, CYAN ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 2 as any ] as Coordinate,
							tileSize,
						},
						{
							baseId: 120,
							colors: [ MAGENTA, MAGENTA ],
							tileOrigin: [ tileSize * 3 as any, tileSize * 3 as any ] as Coordinate,
							tileSize,
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
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: [ tileSize * 0 as any, tileSize * 0 as any ] as Coordinate,
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: [ tileSize * 1 as any, tileSize * 1 as any ] as Coordinate,
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 16,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: [ tileSize * 2 as any, tileSize * 2 as any ] as Coordinate,
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 24,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: [ tileSize * 3 as any, tileSize * 3 as any ] as Coordinate,
					tileSize,
				})).toBe(true)

				expect(standardTileIsColors({
					baseId: 32,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: [ tileSize * 2 as any, tileSize * 0 as any ] as Coordinate,
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 40,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: [ tileSize * 3 as any, tileSize * 1 as any ] as Coordinate,
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 48,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: [ tileSize * 0 as any, tileSize * 2 as any ] as Coordinate,
					tileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 56,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: [ tileSize * 1 as any, tileSize * 3 as any ] as Coordinate,
					tileSize,
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
						colors: [ BLACK, TRANSPARENT ],
						tileOrigin: [ tileSize * 0 as any, tileSize * 0 as any ] as Coordinate,
						tileSize,
					},
					{
						baseId: 8,
						colors: [ BLACK, BLACK ],
						tileOrigin: [ tileSize * 0 as any, tileSize * 1 as any ] as Coordinate,
						tileSize,
					},
					{
						baseId: 16,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: [ tileSize * 1 as any, tileSize * 0 as any ] as Coordinate,
						tileSize,
					},
					{
						baseId: 24,
						colors: [ TRANSPARENT, BLACK ],
						tileOrigin: [ tileSize * 1 as any, tileSize * 1 as any ] as Coordinate,
						tileSize,
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
						backgroundColor: YELLOW,
						colorSet: [ BLACK, TRANSPARENT ],
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
