import sectionCenterIsColor from './sectionCenterIsColor'
import { Color, Coordinate, Address, Units } from '../../../src'

const standardTileIsColors: {
	({}: { baseId: number, colors: Color[], tileOrigin: Coordinate, tileSize: Units }): boolean,
} = ({ baseId, colors, tileOrigin: areaOrigin, tileSize: areaSize }) => {
	const expectations = [
		{
			areaOrigin,
			areaSize,
			sectionAddress: [ 0, 0 ] as Address,
			sectionResolution: 4,
			color: colors[ 0 ],
			id: baseId + 0,
		},

		{
			areaOrigin,
			areaSize,
			sectionAddress: [ 2, 0 ] as Address,
			sectionResolution: 4,
			color: colors[ 1 ],
			id: baseId + 1,
		},
		{
			areaOrigin,
			areaSize,
			sectionAddress: [ 1, 1 ] as Address,
			sectionResolution: 4,
			color: colors[ 1 ],
			id: baseId + 2,
		},
		{
			areaOrigin,
			areaSize,
			sectionAddress: [ 0, 2 ] as Address,
			sectionResolution: 4,
			color: colors[ 1 ],
			id: baseId + 3,
		},

		{
			areaOrigin,
			areaSize,
			sectionAddress: [ 3, 1 ] as Address,
			sectionResolution: 4,
			color: colors[ 0 ],
			id: baseId + 4,
		},
		{
			areaOrigin,
			areaSize,
			sectionAddress: [ 2, 2 ] as Address,
			sectionResolution: 4,
			color: colors[ 0 ],
			id: baseId + 5,
		},
		{
			areaOrigin,
			areaSize,
			sectionAddress: [ 1, 3 ] as Address,
			sectionResolution: 4,
			color: colors[ 0 ],
			id: baseId + 6,
		},

		{
			areaOrigin,
			areaSize,
			sectionAddress: [ 3, 3 ] as Address,
			sectionResolution: 4,
			color: colors[ 1 ],
			id: baseId + 7,
		},
	]

	return expectations.every(sectionCenterIsColor)
}

export default standardTileIsColors
