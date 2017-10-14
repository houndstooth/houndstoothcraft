import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import pixelIsColor from '../../helpers/pixelIsColor'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import standardTileIsColors from '../../helpers/standardTileIsColors'
import { TILE_SIZE } from '../../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../../helpers/getFromBasePatternOrDefault'
import sectionCenterIsColor from '../../helpers/sectionCenterIsColor'
import Address from '../../../../src/components/types/Address'
import CanvasSize from '../../../../src/canvas/types/CanvasSize'
import Coordinate from '../../../../src/space/types/Coordinate'
import Units from '../../../../src/components/types/Units'

describe('.viewSettings', () => {
	describe('.canvasSize', () => {
		it('works', () => {
			const houndstoothOverrides = {
				basePattern: {
					colorSettings: { colorSet: [ BLACK ] },
					viewSettings: { canvasSize: 125 as CanvasSize },
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(pixelIsColor([ 0, 0 ] as Coordinate, BLACK)).toBe(true)
			expect(pixelIsColor([ 124, 0 ] as Coordinate, BLACK)).toBe(true)
			expect(pixelIsColor([ 0, 124 ] as Coordinate, BLACK)).toBe(true)
			expect(pixelIsColor([ 124, 124 ] as Coordinate, BLACK)).toBe(true)
			expect(pixelIsColor([ 125, 0 ] as Coordinate, TRANSPARENT)).toBe(true)
			expect(pixelIsColor([ 0, 125 ] as Coordinate, TRANSPARENT)).toBe(true)
			expect(pixelIsColor([ 125, 125 ] as Coordinate, TRANSPARENT)).toBe(true)
		})
	})

	describe('.zoom', () => {
		it('works', () => {
			const zoom = 2
			const houndstoothOverrides = {
				basePattern: {
					viewSettings: { zoom },
					gridSettings: { gridSize: 2 },
				},
			}
			const tileSize = getFromBasePatternOrDefault(TILE_SIZE) as Units

			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(standardTileIsColors({
				baseId: 0,
				tileOrigin: [ 0 * zoom * tileSize, 0 * zoom * tileSize ] as Coordinate,
				tileSize: zoom * tileSize,
				colors: [ TRANSPARENT, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				tileOrigin: [ 1 * zoom * tileSize, 0 * zoom * tileSize ] as Coordinate,
				tileSize: zoom * tileSize,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				tileOrigin: [ 0 * zoom * tileSize, 1 * zoom * tileSize ] as Coordinate,
				tileSize: zoom * tileSize,
				colors: [ BLACK, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				tileOrigin: [ 1 * zoom * tileSize, 1 * zoom * tileSize ] as Coordinate,
				tileSize: zoom * tileSize,
				colors: [ BLACK, TRANSPARENT ],
			})).toBe(true)
		})
	})

	describe('.zoomOnCanvasCenter', () => {
		it(`leaves the right and bottom quadrants empty if the grid would take up only the top left before
			zooming, because instead of growing from the origin in the top left it grows away from the center`, () => {
				const zoom = 2
				const houndstoothOverrides = {
					basePattern: {
						viewSettings: {
							zoomOnCanvasCenter: true,
							zoom: 2,
						},
						gridSettings: { gridSize: 8 },
					},
				}
				const tileSize = getFromBasePatternOrDefault(TILE_SIZE) as Units

				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				expect(standardTileIsColors({
					baseId: 0,
					tileOrigin: [ 3 * zoom * tileSize, 3 * zoom * tileSize ] as Coordinate,
					tileSize: zoom * tileSize,
					colors: [ BLACK, TRANSPARENT ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 8,
					tileOrigin: [ 3 * zoom * tileSize, 4 * zoom * tileSize ] as Coordinate,
					tileSize: zoom * tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 16,
					tileOrigin: [ 4 * zoom * tileSize, 3 * zoom * tileSize ] as Coordinate,
					tileSize: zoom * tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: 24,
					tileOrigin: [ 4 * zoom * tileSize, 4 * zoom * tileSize ] as Coordinate,
					tileSize: zoom * tileSize,
					colors: [ TRANSPARENT, TRANSPARENT ],
				})).toBe(true)
			})
	})

	describe('.centerViewOnCenterOfTileAtHomeAddress', () => {
		it('is self-explanatory', () => {
			const tileSize = 100
			const houndstoothOverrides = {
				basePattern: {
					tileSettings: { tileSizeSetting: tileSize },
					viewSettings: { centerViewOnCenterOfTileAtHomeAddress: true },
					gridSettings: { gridSize: 2 },
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(standardTileIsColors({
				baseId: 0,
				tileOrigin: [ 350, 350 ] as Coordinate,
				tileSize: 100,
				colors: [ TRANSPARENT, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				tileOrigin: [ 450, 350 ] as Coordinate,
				tileSize: 100,
				colors: [ TRANSPARENT, TRANSPARENT ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				tileOrigin: [ 350, 450 ] as Coordinate,
				tileSize: 100,
				colors: [ BLACK, BLACK ],
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				tileOrigin: [ 450, 450 ] as Coordinate,
				tileSize: 100,
				colors: [ BLACK, TRANSPARENT ],
			})).toBe(true)
		})
	})

	describe('.rotateViewAboutCanvasCenter', () => {
		it('rotates the entire grid about the canvas center', () => {
			const areaSize = getFromBasePatternOrDefault(TILE_SIZE) as Units

			const houndstoothOverrides = {
				basePattern: {
					viewSettings: {
						canvasSize: 300 as CanvasSize,
						rotateViewAboutCanvasCenter: Math.PI / 2,
					},
					tileSettings: {
						tileSizeSetting: areaSize,
					},
					gridSettings: {
						gridSize: 2,
					},
				},
			}

			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let areaOrigin = [ 200, 0 ] as Coordinate

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 3 ] as Address,
				color: BLACK,
				id: 1,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 1 ] as Address,
				color: BLACK,
				id: 2,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 2 ] as Address,
				color: BLACK,
				id: 3,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 3 ] as Address,
				color: BLACK,
				id: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 0 ] as Address,
				color: BLACK,
				id: 5,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 1 ] as Address,
				color: BLACK,
				id: 6,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 2 ] as Address,
				color: BLACK,
				id: 7,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 0 ] as Address,
				color: BLACK,
				id: 8,
			})).toBe(true)

			areaOrigin = [ 250, 0 ] as Coordinate

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 3 ] as Address,
				color: BLACK,
				id: 9,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 1 ] as Address,
				color: TRANSPARENT,
				id: 10,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 2 ] as Address,
				color: TRANSPARENT,
				id: 11,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 3 ] as Address,
				color: TRANSPARENT,
				id: 12,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 0 ] as Address,
				color: BLACK,
				id: 13,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 1 ] as Address,
				color: BLACK,
				id: 14,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 2 ] as Address,
				color: BLACK,
				id: 15,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 0 ] as Address,
				color: TRANSPARENT,
				id: 16,
			})).toBe(true)

			areaOrigin = [ 200, 50 ] as Coordinate

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 3 ] as Address,
				color: TRANSPARENT,
				id: 17,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 1 ] as Address,
				color: BLACK,
				id: 18,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 2 ] as Address,
				color: BLACK,
				id: 19,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 3 ] as Address,
				color: BLACK,
				id: 20,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 0 ] as Address,
				color: TRANSPARENT,
				id: 21,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 1 ] as Address,
				color: TRANSPARENT,
				id: 22,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 2 ] as Address,
				color: TRANSPARENT,
				id: 23,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 0 ] as Address,
				color: BLACK,
				id: 24,
			})).toBe(true)

			areaOrigin = [ 250, 50 ] as Coordinate

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 3 ] as Address,
				color: TRANSPARENT,
				id: 25,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 1 ] as Address,
				color: TRANSPARENT,
				id: 26,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 2 ] as Address,
				color: TRANSPARENT,
				id: 27,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 3 ] as Address,
				color: TRANSPARENT,
				id: 28,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 0 ] as Address,
				color: TRANSPARENT,
				id: 29,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 1 ] as Address,
				color: TRANSPARENT,
				id: 30,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 2 ] as Address,
				color: TRANSPARENT,
				id: 31,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 0 ] as Address,
				color: TRANSPARENT,
				id: 32,
			})).toBe(true)
		})
	})
})
