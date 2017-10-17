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
						viewSettings: { canvasSize: tileSize },
						gridSettings: { gridSize: 1 },
						stripeSettings: {
							stripePositionSettings: {
								stripeCountMode: StripeCountMode.GINGHAM_CHEVRON_CONTINUUM,
							},
						},
					},
				}
			})

			it('works in standard mode', () => {
				activateTestMarkerCanvas()

				executeSelectedHoundstoothEffects({ houndstoothOverrides })

				const tile = {
					baseId: 0,
					tileOrigin: [ 0 as any, 0 as any ] as Coordinate,
					tileSize,
					colors: [ TRANSPARENT, BLACK ],
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

				let areaOrigin = [ 0 * tileSize as any, 0 * tileSize as any ] as Coordinate
				const areaSize = tileSize
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 0, 0 ] as Address,
					color: TRANSPARENT,
					id: 1,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 1, 1 ] as Address,
					color: BLACK,
					id: 2,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 2, 2 ] as Address,
					color: TRANSPARENT,
					id: 3,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 3, 3 ] as Address,
					color: BLACK,
					id: 4,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 4, 4 ] as Address,
					color: TRANSPARENT,
					id: 5,
				})).toBe(true)

				areaOrigin = [ 1 * areaSize as any, 1 * areaSize as any ] as Coordinate
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 0, 0 ] as Address,
					color: BLACK,
					id: 6,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 1, 1 ] as Address,
					color: TRANSPARENT,
					id: 7,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 2, 2 ] as Address,
					color: BLACK,
					id: 8,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 3, 3 ] as Address,
					color: TRANSPARENT,
					id: 9,
				})).toBe(true)
				expect(sectionCenterIsColor({
					areaOrigin,
					areaSize,
					sectionResolution: 5,
					sectionAddress: [ 4, 4 ] as Address,
					color: BLACK,
					id: 10,
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
			areaOrigin = [ 0 * areaSize, 0 * areaSize ]
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
				color: TRANSPARENT,
				id: 2,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 2 ] as Address,
				color: TRANSPARENT,
				id: 3,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 3 ] as Address,
				color: TRANSPARENT,
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
				color: TRANSPARENT,
				id: 8,
			})).toBe(true)

			areaOrigin = [ 1 * areaSize, 1 * areaSize ]

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 3 ] as Address,
				color: TRANSPARENT,
				id: 9,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 0, 1 ] as Address,
				color: BLACK,
				id: 10,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 2 ] as Address,
				color: BLACK,
				id: 11,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 3 ] as Address,
				color: BLACK,
				id: 12,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 1, 0 ] as Address,
				color: TRANSPARENT,
				id: 13,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 2, 1 ] as Address,
				color: TRANSPARENT,
				id: 14,
			})).toBe(true)
			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 2 ] as Address,
				color: TRANSPARENT,
				id: 15,
			})).toBe(true)

			expect(sectionCenterIsColor({
				areaOrigin,
				areaSize,
				sectionResolution: 4,
				sectionAddress: [ 3, 0 ] as Address,
				color: BLACK,
				id: 16,
			})).toBe(true)
		})
	})
})
