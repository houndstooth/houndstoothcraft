import { Address, Color, Coordinate, Units } from '../../../src'
import sectionCenterIsColor from './sectionCenterIsColor'

const standardTileIsColors: {
	({}: { baseId: number, colors: Color[], tileOrigin: Coordinate, tileSize: Units }): boolean,
} = ({ baseId, colors, tileOrigin: areaOrigin, tileSize: areaSize }) => {
	const expectations = [
		{
			areaOrigin,
			areaSize,
			color: colors[ 0 ],
			id: baseId + 0,
			sectionAddress: [ 0, 0 ] as Address,
			sectionResolution: 4,
		},

		{
			areaOrigin,
			areaSize,
			color: colors[ 1 ],
			id: baseId + 1,
			sectionAddress: [ 2, 0 ] as Address,
			sectionResolution: 4,
		},
		{
			areaOrigin,
			areaSize,
			color: colors[ 1 ],
			id: baseId + 2,
			sectionAddress: [ 1, 1 ] as Address,
			sectionResolution: 4,
		},
		{
			areaOrigin,
			areaSize,
			color: colors[ 1 ],
			id: baseId + 3,
			sectionAddress: [ 0, 2 ] as Address,
			sectionResolution: 4,
		},

		{
			areaOrigin,
			areaSize,
			color: colors[ 0 ],
			id: baseId + 4,
			sectionAddress: [ 3, 1 ] as Address,
			sectionResolution: 4,
		},
		{
			areaOrigin,
			areaSize,
			color: colors[ 0 ],
			id: baseId + 5,
			sectionAddress: [ 2, 2 ] as Address,
			sectionResolution: 4,
		},
		{
			areaOrigin,
			areaSize,
			color: colors[ 0 ],
			id: baseId + 6,
			sectionAddress: [ 1, 3 ] as Address,
			sectionResolution: 4,
		},

		{
			areaOrigin,
			areaSize,
			color: colors[ 1 ],
			id: baseId + 7,
			sectionAddress: [ 3, 3 ] as Address,
			sectionResolution: 4,
		},
	]

	return expectations.every(sectionCenterIsColor)
}

export default standardTileIsColors
