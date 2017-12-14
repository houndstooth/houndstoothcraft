import {
	appState,
	BLACK,
	Coordinate,
	executeSelectedEffects,
	from,
	patternState,
	to,
	TRANSPARENT,
	Unit,
} from '../../../../src/indexForTest'
import { sectionCenterIsColor, standardTileIsColors } from '../../helpers'

describe('.viewSettings', () => {
	describe('.zoom', () => {
		it('works', async (done: DoneFn) => {
			const zoom: number = 2
			appState.settings.overrides = {
				basePattern: {
					gridSettings: { tileResolution: 2 },
					viewSettings: { zoom },
				},
			}
			const tileSize: Unit = patternState.tileSettings.tileSize
			const zoomedTileSize: Unit = to.Unit(zoom * from.Unit(tileSize))

			executeSelectedEffects.default()

			setTimeout(() => {
				let baseId: number = -8
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(zoomedTileSize) * 0, from.Unit(zoomedTileSize) * 0 ]),
					tileSize: zoomedTileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(zoomedTileSize) * 1, from.Unit(zoomedTileSize) * 0 ]),
					tileSize: zoomedTileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ from.Unit(zoomedTileSize) * 0, from.Unit(zoomedTileSize) * 1 ]),
					tileSize: zoomedTileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(zoomedTileSize) * 1, from.Unit(zoomedTileSize) * 1 ]),
					tileSize: zoomedTileSize,
				})).toBe(true)

				done()
			},         0)
		})
	})

	describe('.zoomOnCanvasCenter', () => {
		// tslint:disable-next-line:max-line-length
		it('leaves the right and bottom quadrants empty if the grid would take up only the top left before zooming, because instead of growing from the origin in the top left it grows away from the center', async (done: DoneFn) => {
			const zoom: number = 2
			appState.settings.overrides = {
				basePattern: {
					gridSettings: { tileResolution: 8 },
					viewSettings: {
						zoom: 2,
						zoomOnCanvasCenter: true,
					},
				},
			}
			const tileSize: Unit = patternState.tileSettings.tileSize
			const zoomedTileSize: Unit = to.Unit(zoom * from.Unit(tileSize))

			executeSelectedEffects.default()

			setTimeout(() => {
				let baseId: number = -8
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(zoomedTileSize) * 3, from.Unit(zoomedTileSize) * 3 ]),
					tileSize: zoomedTileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(zoomedTileSize) * 3, from.Unit(zoomedTileSize) * 4 ]),
					tileSize: zoomedTileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(zoomedTileSize) * 4, from.Unit(zoomedTileSize) * 3 ]),
					tileSize: zoomedTileSize,
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ from.Unit(zoomedTileSize) * 4, from.Unit(zoomedTileSize) * 4 ]),
					tileSize: zoomedTileSize,
				})).toBe(true)

				done()
			},         0)
		})
	})

	describe('.centerViewOnCenterOfTileAtHomeAddress', () => {
		it('is self-explanatory', async (done: DoneFn) => {
			const tileSize: Unit = to.Unit(100)
			appState.settings.overrides = {
				basePattern: {
					gridSettings: { tileResolution: 2 },
					tileSettings: { tileSize },
					viewSettings: { centerViewOnCenterOfTileAtHomeAddress: true },
				},
			}

			executeSelectedEffects.default()

			setTimeout(() => {
				let baseId: number = -8
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ 350, 350 ]),
					tileSize: to.Unit(100),
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ TRANSPARENT, TRANSPARENT ],
					tileOrigin: to.Coordinate([ 450, 350 ]),
					tileSize: to.Unit(100),
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ BLACK, BLACK ],
					tileOrigin: to.Coordinate([ 350, 450 ]),
					tileSize: to.Unit(100),
				})).toBe(true)
				expect(standardTileIsColors({
					baseId: baseId += 8,
					colors: [ BLACK, TRANSPARENT ],
					tileOrigin: to.Coordinate([ 450, 450 ]),
					tileSize: to.Unit(100),
				})).toBe(true)

				done()
			},         0)
		})
	})

	describe('.rotationAboutCanvasCenter', () => {
		it('rotates the entire grid about the canvas center', async (done: DoneFn) => {
			const areaSize: Unit = patternState.tileSettings.tileSize

			appState.settings.overrides = {
				basePattern: {
					gridSettings: {
						tileResolution: 2,
					},
					tileSettings: {
						tileSize: areaSize,
					},
					viewSettings: {
						rotationAboutCanvasCenter: to.Radian(Math.PI / 2),
					},
				},
			}

			executeSelectedEffects.default()

			setTimeout(() => {
				let areaOrigin: Coordinate = to.Coordinate([ 700, 0 ])
				let id: number = -1

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 0, 3 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 0, 1 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 1, 2 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 2, 3 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 1, 0 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 2, 1 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 3, 2 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 3, 0 ]),
					sectionResolution: 4,
				})).toBe(true)

				areaOrigin = to.Coordinate([ 750, 0 ])

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 0, 3 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 0, 1 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 1, 2 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 2, 3 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 1, 0 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 2, 1 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 3, 2 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 3, 0 ]),
					sectionResolution: 4,
				})).toBe(true)

				areaOrigin = to.Coordinate([ 700, 50 ])

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 0, 3 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 0, 1 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 1, 2 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 2, 3 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 1, 0 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 2, 1 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 3, 2 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: id++,
					sectionAddress: to.Address([ 3, 0 ]),
					sectionResolution: 4,
				})).toBe(true)

				areaOrigin = to.Coordinate([ 750, 50 ])

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 0, 3 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 0, 1 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 1, 2 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 2, 3 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 1, 0 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 2, 1 ]),
					sectionResolution: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 3, 2 ]),
					sectionResolution: 4,
				})).toBe(true)

				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: id++,
					sectionAddress: to.Address([ 3, 0 ]),
					sectionResolution: 4,
				})).toBe(true)

				done()
			},         0)
		})
	})
})
