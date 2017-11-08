import { executeSelectedHoundstoothEffects } from '../../../../src/app/execute/executeSelectedHoundstoothEffects'
import { getFromBaseOrDefaultPattern } from '../../../../src/app/store/getFromBaseOrDefaultPattern'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import * as from from '../../../../src/from'
import { Unit } from '../../../../src/pattern/grid/types'
import { Coordinate } from '../../../../src/pattern/stripe'
import { StripeCountMode } from '../../../../src/pattern/stripe/types'
import { Effect } from '../../../../src/pattern/types'
import * as to from '../../../../src/to'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { sectionCenterIsColor } from '../../helpers/sectionCenterIsColor'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'
import { StandardTileExpectation } from '../../helpers/types'

describe('.stripeSettings', () => {
	const areaSize: Unit = getFromBaseOrDefaultPattern('tileSize')

	describe('.stripePositionSettings', () => {
		describe('.stripeCountMode', () => {
			let houndstoothOverrides: Effect
			beforeEach(() => {
				houndstoothOverrides = {
					basePattern: {
						gridSettings: { tileResolution: 1 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountMode: StripeCountMode.GinghamChevronContinuum,
							},
						},
						viewSettings: { canvasSize: to.Px(from.Unit(areaSize)) },
					},
				}
			})

			it('works in standard mode', async (done: DoneFn) => {
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

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
				const houndstoothOverrides: Effect = {
					basePattern: {
						gridSettings: { tileResolution: 2 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCount: 5,
							},
						},
					},
				}
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

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
