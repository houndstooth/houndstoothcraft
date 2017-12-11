import {
	constants,
	Coordinate,
	Effect,
	executeSelectedEffects,
	from,
	patternState,
	StripeCountMode,
	to,
	Unit,
} from '../../../../src/indexForTest'
import {
	sectionCenterIsColor,
	StandardTileExpectation,
	standardTileIsColors,
} from '../../helpers'

const { BLACK, TRANSPARENT } = constants

describe('.stripeSettings', () => {
	let areaSize: Unit
	beforeEach(() => {
		areaSize = patternState.get('tileSize')
	})

	describe('.stripePositionSettings', () => {
		describe('.stripeCountMode', () => {
			let overrides: Effect
			beforeEach(() => {
				overrides = {
					basePattern: {
						gridSettings: { tileResolution: 1 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountMode: StripeCountMode.GinghamChevronContinuum,
							},
						},
					},
				}
			})

			it('works in standard mode', async (done: DoneFn) => {
				executeSelectedEffects.default({ overrides })

				setTimeout(() => {
					const tile: StandardTileExpectation = {
						baseId: 0,
						colors: [ TRANSPARENT, BLACK ],
						tileOrigin: to.Coordinate([ 0, 0 ]),
						tileSize: areaSize,
					}
					expect(standardTileIsColors(tile)).toBe(true)

					done()
				},         0)
			})
		})

		describe('.stripeCount', () => {
			it('changes the number of stripes in striped tiles', async (done: DoneFn) => {
				const overrides: Effect = {
					basePattern: {
						gridSettings: { tileResolution: 2 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCount: 5,
							},
						},
					},
				}

				executeSelectedEffects.default({ overrides })

				setTimeout(() => {
					let areaOrigin: Coordinate = to.Coordinate([ from.Unit(areaSize) * 0, from.Unit(areaSize) * 0 ])
					let id: number = -1
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: TRANSPARENT,
						id: id++,
						sectionAddress: to.Address([ 0, 0 ]),
						sectionResolution: 5,
					})).toBe(true)
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: BLACK,
						id: id++,
						sectionAddress: to.Address([ 1, 1 ]),
						sectionResolution: 5,
					})).toBe(true)
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: TRANSPARENT,
						id: id++,
						sectionAddress: to.Address([ 2, 2 ]),
						sectionResolution: 5,
					})).toBe(true)
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: BLACK,
						id: id++,
						sectionAddress: to.Address([ 3, 3 ]),
						sectionResolution: 5,
					})).toBe(true)
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: TRANSPARENT,
						id: id++,
						sectionAddress: to.Address([ 4, 4 ]),
						sectionResolution: 5,
					})).toBe(true)

					areaOrigin = to.Coordinate([ from.Unit(areaSize) * 1, from.Unit(areaSize) * 1 ])
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: BLACK,
						id: id++,
						sectionAddress: to.Address([ 0, 0 ]),
						sectionResolution: 5,
					})).toBe(true)
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: TRANSPARENT,
						id: id++,
						sectionAddress: to.Address([ 1, 1 ]),
						sectionResolution: 5,
					})).toBe(true)
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: BLACK,
						id: id++,
						sectionAddress: to.Address([ 2, 2 ]),
						sectionResolution: 5,
					})).toBe(true)
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: TRANSPARENT,
						id: id++,
						sectionAddress: to.Address([ 3, 3 ]),
						sectionResolution: 5,
					})).toBe(true)
					expect(sectionCenterIsColor({
						areaOrigin,
						areaSize,
						color: BLACK,
						id: id++,
						sectionAddress: to.Address([ 4, 4 ]),
						sectionResolution: 5,
					})).toBe(true)

					done()
				},         0)
			})
		})
	})
})
