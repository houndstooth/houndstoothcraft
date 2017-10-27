import { from, to } from '../../../src'
import { Address } from '../../../src/components'
import { Unit } from '../../../src/components/types/Unit'
import { Coordinate } from '../../../src/space'
import { drawPassMarker } from './drawPassMarker'
import { pixelIsColor } from './pixelIsColor'
import { SectionCenterExpectation } from './types'

const sectionCenterIsColor: (_: SectionCenterExpectation) => boolean = (params: SectionCenterExpectation) => {
	const { areaOrigin, areaSize, color, id = 0, sectionAddress, sectionResolution }: SectionCenterExpectation = params

	const coordinateUnderTest: Coordinate = sectionCenter({ areaOrigin, areaSize, sectionResolution, sectionAddress })
	const passed: boolean = pixelIsColor(coordinateUnderTest, color)
	drawPassMarker({ passed, coordinateUnderTest, id })

	return passed
}

interface SectionCenter {
	areaOrigin: Coordinate,
	areaSize: Unit,
	sectionAddress: Address[],
	sectionResolution: number,
}

const sectionCenter: (_: SectionCenter) => Coordinate = (params: SectionCenter) => {
	const { areaOrigin, areaSize, sectionAddress, sectionResolution }: SectionCenter = params
	const sectionSize: number = from.Unit(areaSize) / sectionResolution
	const areaX: number = from.Unit(areaOrigin[ 0 ])
	const areaY: number = from.Unit(areaOrigin[ 1 ])
	const sectionAddressValue: number[] = from.Address(sectionAddress)

	return to.Coordinate([
		areaX + (sectionAddressValue[ 0 ] + 0.5) * sectionSize,
		areaY + (sectionAddressValue[ 1 ] + 0.5) * sectionSize,
	])
}

export { sectionCenterIsColor }
