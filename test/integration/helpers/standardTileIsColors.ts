import { Color, Coordinate, to, Units } from '../../../src'
import { sectionCenterIsColor } from './sectionCenterIsColor'

const standardTileIsColors: (_: {
	baseId: number, colors: Color[], tileOrigin: Coordinate, tileSize: Units,
}) => boolean = ({ baseId, colors, tileOrigin: areaOrigin, tileSize: areaSize }) => {
	let id = baseId - 1
	const expectations = [
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
