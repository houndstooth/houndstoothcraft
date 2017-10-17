import { Address } from '../../../src/components'
import Units from '../../../src/components/types/Units'
import { Color } from '../../../src/render'
import { Coordinate } from '../../../src/space'
import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'

const sectionCenterIsColor: (_: {
		areaOrigin: Coordinate,
		areaSize: Units,
		color: Color,
		id?: number,
		sectionAddress: Address,
		sectionResolution: number,
	}) => boolean = ({ areaOrigin, areaSize, color, id = 0, sectionAddress, sectionResolution }) => {
	const coordinateUnderTest = sectionCenter({ areaOrigin, areaSize, sectionResolution, sectionAddress })
	const passed = pixelIsColor(coordinateUnderTest, color)
	drawPassMarker({ passed, coordinateUnderTest, id })

	return passed
}

const sectionCenter: (_: {
		areaOrigin: Coordinate,
		areaSize: Units,
		sectionAddress: Address,
		sectionResolution: number,
	}) => Coordinate = ({ areaOrigin, areaSize, sectionAddress, sectionResolution }) => {
	const sectionSize = areaSize as any / sectionResolution
	const areaX = areaOrigin[ 0 ] as any
	const areaY = areaOrigin[ 1 ] as any

	return [
		areaX + (sectionAddress[ 0 ] + 0.5) * sectionSize,
		areaY + (sectionAddress[ 1 ] + 0.5) * sectionSize,
	] as Coordinate
}

export default sectionCenterIsColor
