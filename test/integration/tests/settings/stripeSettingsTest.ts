import { from, to } from '../../../../src'
import { BaseStripeDiagonal, StripeCountMode, Unit } from '../../../../src/components'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { Coordinate } from '../../../../src/space'
import { getFromBaseOrDefaultPattern } from '../../../../src/store/getFromBaseOrDefaultPattern'
import { Effect } from '../../../../src/store/types/Effect'
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
						gridSettings: { gridSize: 1 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountMode: StripeCountMode.GinghamChevronContinuum,
							},
						},
						viewSettings: { canvasSize: to.Px(from.Unit(areaSize)) },
					},
				}
			})

			it('works in standard mode', () => {
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				const tile: StandardTileExpectation = {
					baseId: 0,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ 0, 0 ]),
					tileSize: areaSize,
				}
				expect(standardTileIsColors(tile)).toBe(true)
			})
		})

		describe('.stripeCount', () => {
			it('changes the number of stripes in striped tiles', () => {
				const houndstoothOverrides: Effect = {
					basePattern: {
						gridSettings: { gridSize: 2 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCount: 5,
							},
						},
					},
				}
				activateTestMarkerCanvas()
				executeSelectedHoundstoothEffects({ houndstoothOverrides })

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
			})
		})
	})

	xdescribe('.baseStripeDiagonal', () => {
		it('can be set to principal, to change the orientation of the stripes', () => {
			const houndstoothOverrides: Effect = {
				basePattern: {
					stripeSettings: {
						baseStripeDiagonal: BaseStripeDiagonal.Principal,
					},
				},
			}
			activateTestMarkerCanvas()
			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let areaOrigin: Coordinate
			let id: number = -1

			areaOrigin = to.Coordinate([ from.Unit(areaSize) * 0, from.Unit(areaSize) * 0 ])
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

			areaOrigin = to.Coordinate([ from.Unit(areaSize) * 1, from.Unit(areaSize) * 1 ])

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
		})
	})
})
