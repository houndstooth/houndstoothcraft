import { to } from '../../../../src'
import { BaseStripeDiagonal } from '../../../../src/components/types/BaseStripeDiagonal'
import { StripeCountMode } from '../../../../src/components/types/StripeCountMode'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import { executeSelectedHoundstoothEffects } from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { getFromBasePatternOrDefault } from '../../../helpers/getFromBasePatternOrDefault'
import { TILE_SIZE } from '../../../helpers/settingsPaths'
import { activateTestMarkerCanvas } from '../../helpers/activateTestMarkerCanvas'
import { sectionCenterIsColor } from '../../helpers/sectionCenterIsColor'
import { standardTileIsColors } from '../../helpers/standardTileIsColors'

describe('.stripeSettings', () => {
	const tileSize = getFromBasePatternOrDefault(TILE_SIZE)

	describe('.stripePositionSettings', () => {
		describe('.stripeCountMode', () => {
			let houndstoothOverrides
			beforeEach(() => {
				houndstoothOverrides = {
					basePattern: {
						gridSettings: { gridSize: 1 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountMode: StripeCountMode.GinghamChevronContinuum,
							},
						},
						viewSettings: { canvasSize: tileSize },
					},
				}
			})

			it('works in standard mode', () => {
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				const tile = {
					baseId: 0,
					colors: [ TRANSPARENT, BLACK ],
					tileOrigin: to.Coordinate([ 0, 0 ]),
					tileSize,
				}
				expect(standardTileIsColors(tile)).toBe(true)
			})
		})

		describe('.stripeCountSetting', () => {
			it('changes the number of stripes in striped tiles', () => {
				const houndstoothOverrides = {
					basePattern: {
						gridSettings: { gridSize: 2 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountSetting: 5,
							},
						},
					},
				}
				activateTestMarkerCanvas()
				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				let areaOrigin = to.Coordinate([ tileSize * 0, tileSize * 0 ])
				const areaSize = tileSize
				let id = -1
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

				areaOrigin = to.Coordinate([ areaSize * 1, areaSize * 1 ])
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
			const houndstoothOverrides = {
				basePattern: {
					stripeSettings: {
						baseStripeDiagonal: BaseStripeDiagonal.Principal,
					},
				},
			}
			activateTestMarkerCanvas()
			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let areaOrigin
			let id = -1

			const areaSize = tileSize
			areaOrigin = [ areaSize * 0, areaSize * 0 ]
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

			areaOrigin = [ areaSize * 1, areaSize * 1 ]

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
