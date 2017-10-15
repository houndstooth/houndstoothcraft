import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'
import { Coordinate } from '../../../src/space'
import { Color } from '../../../src/render'
import { Address } from '../../../src/components'
import Units from '../../../src/components/types/Units'

const sectionCenterIsColor: {
	({}: {
		areaOrigin: Coordinate,
		areaSize: Units,
		sectionResolution: number,
		sectionAddress: Address,
		color: Color,
		id?: number,
	}): boolean,
} = ({ areaOrigin, areaSize, sectionResolution, sectionAddress, color, id }) => {
	const coordinateUnderTest = sectionCenter({ areaOrigin, areaSize, sectionResolution, sectionAddress })
	const passed = pixelIsColor(coordinateUnderTest, color)
	drawPassMarker({ passed, coordinateUnderTest, id })

	return passed
}

const sectionCenter: {
	({}: {
		areaOrigin: Coordinate,
		areaSize: Units,
		sectionResolution: number,
		sectionAddress: Address,
	}): Coordinate,
} = ({ areaOrigin, areaSize, sectionResolution, sectionAddress }) => {
	const sectionSize = areaSize as any / sectionResolution
	const areaX = areaOrigin[0] as any
	const areaY = areaOrigin[1] as any

	return [
		areaX + (sectionAddress[ 0 ] + 0.5) * sectionSize,
		areaY + (sectionAddress[ 1 ] + 0.5) * sectionSize,
	] as Coordinate
}

export default sectionCenterIsColor
