import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'
import { Coordinate } from '../../../src/space'
import { Color } from '../../../src/render'
import { Address } from '../../../src/components'
import Units from '../../../src/components/types/Units'

type SectionCenterIsColor = {
	({}: {
		areaOrigin: Coordinate,
		areaSize: Units,
		sectionResolution: number,
		sectionAddress: Address,
		color: Color,
		id?: number,
	}): boolean,
}

const sectionCenterIsColor: SectionCenterIsColor = params => {
	const { areaOrigin, areaSize, sectionResolution, sectionAddress, color, id } = params
	const coordinateUnderTest = sectionCenter({ areaOrigin, areaSize, sectionResolution, sectionAddress })
	const passed = pixelIsColor(coordinateUnderTest, color)
	drawPassMarker({ passed, coordinateUnderTest, id })

	return passed
}

type SectionCenter = {
	({}: {
		areaOrigin: Coordinate,
		areaSize: Units,
		sectionResolution: number,
		sectionAddress: Address,
	}): Coordinate,
}

const sectionCenter: SectionCenter = ({ areaOrigin, areaSize, sectionResolution, sectionAddress }) => {
	const sectionSize = areaSize as any / sectionResolution
	const areaX = areaOrigin[0] as any
	const areaY = areaOrigin[1] as any

	return [
		areaX + (sectionAddress[ 0 ] + 0.5) * sectionSize,
		areaY + (sectionAddress[ 1 ] + 0.5) * sectionSize,
	] as Coordinate
}

export default sectionCenterIsColor
