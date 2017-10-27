import { to } from '../../../src'
import { sectionCenterIsColor } from './sectionCenterIsColor'
import { SectionCenterExpectation, StandardTileExpectation } from './types'

const standardTileIsColors: (_: StandardTileExpectation) => boolean =
	({ baseId, colors, tileOrigin: areaOrigin, tileSize: areaSize }: StandardTileExpectation): boolean => {
		let id: number = baseId - 1
		const expectations: SectionCenterExpectation[] = [
			{
				areaOrigin,
				areaSize,
				color: colors[ 0 ],
				id: id += 1,
				sectionAddress: to.Address([ 0, 0 ]),
				sectionResolution: 4,
			},

			{
				areaOrigin,
				areaSize,
				color: colors[ 1 ],
				id: id += 1,
				sectionAddress: to.Address([ 2, 0 ]),
				sectionResolution: 4,
			},
			{
				areaOrigin,
				areaSize,
				color: colors[ 1 ],
				id: id += 1,
				sectionAddress: to.Address([ 1, 1 ]),
				sectionResolution: 4,
			},
			{
				areaOrigin,
				areaSize,
				color: colors[ 1 ],
				id: id += 1,
				sectionAddress: to.Address([ 0, 2 ]),
				sectionResolution: 4,
			},

			{
				areaOrigin,
				areaSize,
				color: colors[ 0 ],
				id: id += 1,
				sectionAddress: to.Address([ 3, 1 ]),
				sectionResolution: 4,
			},
			{
				areaOrigin,
				areaSize,
				color: colors[ 0 ],
				id: id += 1,
				sectionAddress: to.Address([ 2, 2 ]),
				sectionResolution: 4,
			},
			{
				areaOrigin,
				areaSize,
				color: colors[ 0 ],
				id: id += 1,
				sectionAddress: to.Address([ 1, 3 ]),
				sectionResolution: 4,
			},

			{
				areaOrigin,
				areaSize,
				color: colors[ 1 ],
				id: id += 1,
				sectionAddress: to.Address([ 3, 3 ]),
				sectionResolution: 4,
			},
		]

		return expectations.every(sectionCenterIsColor)
	}

export { standardTileIsColors }
