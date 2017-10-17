import CanvasSize from '../../../../src/canvas/types/CanvasSize'
import Address from '../../../../src/components/types/Address'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import Coordinate from '../../../../src/space/types/Coordinate'
import getFromBasePatternOrDefault from '../../../helpers/getFromBasePatternOrDefault'
import { TILE_SIZE } from '../../../helpers/settingsPaths'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import pixelIsColor from '../../helpers/pixelIsColor'
import sectionCenterIsColor from '../../helpers/sectionCenterIsColor'
import standardTileIsColors from '../../helpers/standardTileIsColors'

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

			expect(pixelIsColor([ 0 as any, 0 as any ] as Coordinate, BLACK)).toBe(true)
			expect(pixelIsColor([ 124 as any, 0 as any ] as Coordinate, BLACK)).toBe(true)
			expect(pixelIsColor([ 0 as any, 124 as any ] as Coordinate, BLACK)).toBe(true)
			expect(pixelIsColor([ 124 as any, 124 as any ] as Coordinate, BLACK)).toBe(true)
			expect(pixelIsColor([ 125 as any, 0 as any ] as Coordinate, TRANSPARENT)).toBe(true)
			expect(pixelIsColor([ 0 as any, 125 as any ] as Coordinate, TRANSPARENT)).toBe(true)
			expect(pixelIsColor([ 125 as any, 125 as any ] as Coordinate, TRANSPARENT)).toBe(true)
		})
	})

	describe('.zoom', () => {
		it('works', () => {
			const zoom = 2
			const houndstoothOverrides = {
				basePattern: {
					gridSettings: { gridSize: 2 },
					viewSettings: { zoom },
				},
			}
			const tileSize = getFromBasePatternOrDefault(TILE_SIZE) as any
			const zoomedTileSize = zoom * tileSize as any

			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(standardTileIsColors({
				baseId: 0,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: [ zoomedTileSize * 0 as any, zoomedTileSize * 0 as any ] as Coordinate,
				tileSize: zoomedTileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ zoomedTileSize * 1 as any, zoomedTileSize * 0 as any ] as Coordinate,
				tileSize: zoomedTileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ zoomedTileSize * 0 as any, zoomedTileSize * 1 as any ] as Coordinate,
				tileSize: zoomedTileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ zoomedTileSize * 1 as any, zoomedTileSize * 1 as any ] as Coordinate,
				tileSize: zoomedTileSize,
			})).toBe(true)
		})
	})

	describe('.zoomOnCanvasCenter', () => {
		// tslint:disable-next-line:max-line-length
		it('leaves the right and bottom quadrants empty if the grid would take up only the top left before zooming, because instead of growing from the origin in the top left it grows away from the center', () => {
			const zoom = 2
			const houndstoothOverrides = {
				basePattern: {
					gridSettings: { gridSize: 8 },
					viewSettings: {
						zoom: 2,
						zoomOnCanvasCenter: true,
					},
				},
			}
			const tileSize = getFromBasePatternOrDefault(TILE_SIZE) as any
			const zoomedTileSize = zoom * tileSize as any

			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(standardTileIsColors({
				baseId: 0,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ zoomedTileSize * 3 as any, zoomedTileSize * 3 as any ] as Coordinate,
				tileSize: zoomedTileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ zoomedTileSize * 3 as any, zoomedTileSize * 4 as any ] as Coordinate,
				tileSize: zoomedTileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ zoomedTileSize * 4 as any, zoomedTileSize * 3 as any ] as Coordinate,
				tileSize: zoomedTileSize,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ zoomedTileSize * 4 as any, zoomedTileSize * 4 as any ] as Coordinate,
				tileSize: zoomedTileSize,
			})).toBe(true)
		})
	})

	describe('.centerViewOnCenterOfTileAtHomeAddress', () => {
		it('is self-explanatory', () => {
			const tileSize = 100 as any
			const houndstoothOverrides = {
				basePattern: {
					gridSettings: { gridSize: 2 },
					tileSettings: { tileSizeSetting: tileSize },
					viewSettings: { centerViewOnCenterOfTileAtHomeAddress: true },
				},
			}
			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			expect(standardTileIsColors({
				baseId: 0,
				colors: [ TRANSPARENT, BLACK ],
				tileOrigin: [ 350 as any, 350 as any ] as Coordinate,
				tileSize: 100 as any,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 8,
				colors: [ TRANSPARENT, TRANSPARENT ],
				tileOrigin: [ 450 as any, 350 as any ] as Coordinate,
				tileSize: 100 as any,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 16,
				colors: [ BLACK, BLACK ],
				tileOrigin: [ 350 as any, 450 as any ] as Coordinate,
				tileSize: 100 as any,
			})).toBe(true)
			expect(standardTileIsColors({
				baseId: 24,
				colors: [ BLACK, TRANSPARENT ],
				tileOrigin: [ 450 as any, 450 as any ] as Coordinate,
				tileSize: 100 as any,
			})).toBe(true)
		})
	})

	describe('.rotateViewAboutCanvasCenter', () => {
		it('rotates the entire grid about the canvas center', () => {
			const areaSize = getFromBasePatternOrDefault(TILE_SIZE) as any

			const houndstoothOverrides = {
				basePattern: {
					gridSettings: {
						gridSize: 2,
					},
					tileSettings: {
						tileSizeSetting: areaSize,
					},
					viewSettings: {
						canvasSize: 300 as CanvasSize,
						rotateViewAboutCanvasCenter: Math.PI / 2 as any,
					},
				},
			}

			activateTestMarkerCanvas()

			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let areaOrigin = [ 200 as any, 0 as any ] as Coordinate

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 1,
				sectionAddress: [ 0, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 2,
				sectionAddress: [ 0, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 3,
				sectionAddress: [ 1, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 4,
				sectionAddress: [ 2, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 5,
				sectionAddress: [ 1, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 6,
				sectionAddress: [ 2, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 7,
				sectionAddress: [ 3, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 8,
				sectionAddress: [ 3, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			areaOrigin = [ 250 as any, 0 as any ] as Coordinate

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 9,
				sectionAddress: [ 0, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 10,
				sectionAddress: [ 0, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 11,
				sectionAddress: [ 1, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 12,
				sectionAddress: [ 2, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 13,
				sectionAddress: [ 1, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 14,
				sectionAddress: [ 2, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 15,
				sectionAddress: [ 3, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 16,
				sectionAddress: [ 3, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			areaOrigin = [ 200 as any, 50 as any ] as Coordinate

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 17,
				sectionAddress: [ 0, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 18,
				sectionAddress: [ 0, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 19,
				sectionAddress: [ 1, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 20,
				sectionAddress: [ 2, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 21,
				sectionAddress: [ 1, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 22,
				sectionAddress: [ 2, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 23,
				sectionAddress: [ 3, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 24,
				sectionAddress: [ 3, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			areaOrigin = [ 250 as any, 50 as any ] as Coordinate

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 25,
				sectionAddress: [ 0, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 26,
				sectionAddress: [ 0, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 27,
				sectionAddress: [ 1, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 28,
				sectionAddress: [ 2, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 29,
				sectionAddress: [ 1, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 30,
				sectionAddress: [ 2, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 31,
				sectionAddress: [ 3, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 32,
				sectionAddress: [ 3, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
		})
	})
})
