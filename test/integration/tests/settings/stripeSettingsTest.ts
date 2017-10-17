import { Address, Coordinate } from '../../../../src'
import BaseStripeDiagonal from '../../../../src/components/types/BaseStripeDiagonal'
import StripeCountMode from '../../../../src/components/types/StripeCountMode'
import { BLACK, TRANSPARENT } from '../../../../src/constants'
import executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import getFromBasePatternOrDefault from '../../../helpers/getFromBasePatternOrDefault'
import { TILE_SIZE } from '../../../helpers/settingsPaths'
import activateTestMarkerCanvas from '../../helpers/activateTestMarkerCanvas'
import sectionCenterIsColor from '../../helpers/sectionCenterIsColor'
import standardTileIsColors from '../../helpers/standardTileIsColors'

describe('.stripeSettings', () => {
	const tileSize = getFromBasePatternOrDefault(TILE_SIZE) as any

	describe('.stripePositionSettings', () => {
		describe('.stripeCountMode', () => {
			let houndstoothOverrides
			beforeEach(() => {
				houndstoothOverrides = {
					basePattern: {
						gridSettings: { gridSize: 1 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountMode: StripeCountMode.GINGHAM_CHEVRON_CONTINUUM,
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
					tileOrigin: [ 0 as any, 0 as any ] as Coordinate,
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

				let areaOrigin = [ tileSize * 0 as any, tileSize * 0 as any ] as Coordinate
				const areaSize = tileSize
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: 1,
					sectionAddress: [ 0, 0 ] as Address,
					sectionResolution: 5,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: 2,
					sectionAddress: [ 1, 1 ] as Address,
					sectionResolution: 5,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: 3,
					sectionAddress: [ 2, 2 ] as Address,
					sectionResolution: 5,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: 4,
					sectionAddress: [ 3, 3 ] as Address,
					sectionResolution: 5,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: 5,
					sectionAddress: [ 4, 4 ] as Address,
					sectionResolution: 5,
				})).toBe(true)

				areaOrigin = [ areaSize * 1 as any, areaSize * 1 as any ] as Coordinate
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: 6,
					sectionAddress: [ 0, 0 ] as Address,
					sectionResolution: 5,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: 7,
					sectionAddress: [ 1, 1 ] as Address,
					sectionResolution: 5,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: 8,
					sectionAddress: [ 2, 2 ] as Address,
					sectionResolution: 5,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: TRANSPARENT,
					id: 9,
					sectionAddress: [ 3, 3 ] as Address,
					sectionResolution: 5,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					color: BLACK,
					id: 10,
					sectionAddress: [ 4, 4 ] as Address,
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
						baseStripeDiagonal: BaseStripeDiagonal.PRINCIPAL,
					},
				},
			}
			activateTestMarkerCanvas()
			executeSelectedHoundstoothEffects({ houndstoothOverrides })

			let areaOrigin

			const areaSize = tileSize
			areaOrigin = [ areaSize * 0, areaSize * 0 ]
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
				color: TRANSPARENT,
				id: 2,
				sectionAddress: [ 0, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 3,
				sectionAddress: [ 1, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
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
				color: TRANSPARENT,
				id: 8,
				sectionAddress: [ 3, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			areaOrigin = [ areaSize * 1, areaSize * 1 ]

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 9,
				sectionAddress: [ 0, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 10,
				sectionAddress: [ 0, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 11,
				sectionAddress: [ 1, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 12,
				sectionAddress: [ 2, 3 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 13,
				sectionAddress: [ 1, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 14,
				sectionAddress: [ 2, 1 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: TRANSPARENT,
				id: 15,
				sectionAddress: [ 3, 2 ] as Address,
				sectionResolution: 4,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				color: BLACK,
				id: 16,
				sectionAddress: [ 3, 0 ] as Address,
				sectionResolution: 4,
			})).toBe(true)
		})
	})
})
