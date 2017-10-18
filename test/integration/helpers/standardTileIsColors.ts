import { Address, Color, Coordinate, Units } from '../../../src'
import { sectionCenterIsColor } from './sectionCenterIsColor'

const standardTileIsColors: (_: {
	baseId: number, colors: Color[], tileOrigin: Coordinate, tileSize: Units
}) => boolean = ({ baseId, colors, tileOrigin: areaOrigin, tileSize: areaSize }) => {
	baseId -= 1
	const expectations = [
		{
			areaOrigin,
			areaSize,
			color: colors[ 0 ],
			id: baseId += 1,
			sectionAddress: [ 0, 0 ] as Address,
			sectionResolution: 4,
		},

		{
			areaOrigin,
			areaSize,
			color: colors[ 1 ],
			id: baseId += 1,
			sectionAddress: [ 2, 0 ] as Address,
			sectionResolution: 4,
		},
		{
			areaOrigin,
			areaSize,
			color: colors[ 1 ],
			id: baseId += 1,
			sectionAddress: [ 1, 1 ] as Address,
			sectionResolution: 4,
		},
		{
			areaOrigin,
			areaSize,
			color: colors[ 1 ],
			id: baseId += 1,
			sectionAddress: [ 0, 2 ] as Address,
			sectionResolution: 4,
		},

		{
			areaOrigin,
			areaSize,
			color: colors[ 0 ],
			id: baseId += 1,
			sectionAddress: [ 3, 1 ] as Address,
			sectionResolution: 4,
		},
		{
			areaOrigin,
			areaSize,
			color: colors[ 0 ],
			id: baseId += 1,
			sectionAddress: [ 2, 2 ] as Address,
			sectionResolution: 4,
		},
		{
			areaOrigin,
			areaSize,
			color: colors[ 0 ],
			id: baseId += 1,
			sectionAddress: [ 1, 3 ] as Address,
			sectionResolution: 4,
		},

		{
			areaOrigin,
			areaSize,
			color: colors[ 1 ],
			id: baseId += 1,
			sectionAddress: [ 3, 3 ] as Address,
			sectionResolution: 4,
		},
	]

	return expectations.every(sectionCenterIsColor)
}

export { standardTileIsColors }
