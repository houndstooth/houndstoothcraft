import { from, to } from '../../../src'
import { Address } from '../../../src/components'
import { Unit } from '../../../src/components/types/Unit'
import { Color } from '../../../src/render'
import { Coordinate } from '../../../src/space'
import { drawPassMarker } from './drawPassMarker'
import { pixelIsColor } from './pixelIsColor'

const sectionCenterIsColor: (_: {
		areaOrigin: Coordinate,
		areaSize: Unit,
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
		areaSize: Unit,
		sectionAddress: Address,
		sectionResolution: number,
	}) => Coordinate = ({ areaOrigin, areaSize, sectionAddress, sectionResolution }) => {
	const sectionSize = from.Unit(areaSize) / sectionResolution
	const areaX = from.Unit(areaOrigin[ 0 ])
	const areaY = from.Unit(areaOrigin[ 1 ])
	const sectionAddressValue = from.Address(sectionAddress)

	return to.Coordinate([
		areaX + (sectionAddressValue[ 0 ] + 0.5) * sectionSize,
		areaY + (sectionAddressValue[ 1 ] + 0.5) * sectionSize,
	])
}

export { sectionCenterIsColor }
