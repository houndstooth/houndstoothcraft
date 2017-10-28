import { from, to } from '../../../src'
import { Address, Unit } from '../../../src/components'
import { Coordinate } from '../../../src/space'
import { drawPassMarker } from './drawPassMarker'
import { pixelIsColor } from './pixelIsColor'
import { SectionCenterExpectation } from './types'

const sectionCenterIsColor: (_: SectionCenterExpectation) => boolean =
	({ areaOrigin, areaSize, color, id = 0, sectionAddress, sectionResolution }: SectionCenterExpectation): boolean => {
		const coordinateUnderTest: Coordinate = sectionCenter({
			areaOrigin,
			areaSize,
			sectionAddress,
			sectionResolution,
		})
		const passed: boolean = pixelIsColor(coordinateUnderTest, color)
		drawPassMarker({ passed, coordinateUnderTest, id })

		return passed
	}

interface SectionCenter {
	areaOrigin: Coordinate,
	areaSize: Unit,
	sectionAddress: Address,
	sectionResolution: number,
}

const sectionCenter: (_: SectionCenter) => Coordinate =
	({ areaOrigin, areaSize, sectionAddress, sectionResolution }: SectionCenter): Coordinate => {
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
