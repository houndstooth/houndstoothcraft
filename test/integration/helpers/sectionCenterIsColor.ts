import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'
import { Coordinate } from '../../../src/space'
import { Color } from '../../../src/render'
import { Address } from '../../../src/components'

type SectionCenterIsColor = {
	({}: {
		areaOrigin: Coordinate,
		areaSize: number,
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
		areaSize: number,
		sectionResolution: number,
		sectionAddress: Address,
	}): Coordinate,
}

const sectionCenter: SectionCenter = ({ areaOrigin, areaSize, sectionResolution, sectionAddress }) => {
	const sectionSize = areaSize / sectionResolution
	return [
		areaOrigin[ 0 ] + (sectionAddress[ 0 ] + 0.5) * sectionSize,
		areaOrigin[ 1 ] + (sectionAddress[ 1 ] + 0.5) * sectionSize,
	] as Coordinate
}

export default sectionCenterIsColor
