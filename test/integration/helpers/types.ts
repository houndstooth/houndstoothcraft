import { Address, Unit } from '../../../src/components'
import { Color } from '../../../src/render'
import { Coordinate } from '../../../src/space'

interface ExpectedSection {
	readonly areaOrigin: Coordinate,
	readonly areaSize: Unit,
	readonly baseId?: number,
}

interface ExpectedDividedSection extends ExpectedSection {
	readonly colors: [ Color, Color ],
}

interface ExpectedSolidSection extends ExpectedSection {
	readonly color: Color,
}

type ExpectDiagonalDividedSection = (_: ExpectedDividedSection) => void

type ExpectSolidSection = (_: ExpectedSolidSection) => void

type Diagonal =
	| 'solid'
	| 'minor'
	| 'principal'
	| 'solidButTestPrincipalToAvoidSeam'
	| 'solidButTestMinorToAvoidSeam'

interface StandardTileExpectation { baseId: number, colors: Color[], tileOrigin: Coordinate, tileSize: Unit }

interface SectionCenterExpectation {
	readonly areaOrigin: Coordinate,
	readonly areaSize: Unit,
	readonly color: Color,
	readonly id?: number,
	readonly sectionAddress: Address,
	readonly sectionResolution: number,
}

interface PixelColorExpectation { coordinateUnderTest: Coordinate, expectedColor: Color, id: number }

export {
	ExpectedSection,
	ExpectedDividedSection,
	ExpectedSolidSection,
	ExpectDiagonalDividedSection,
	ExpectSolidSection,
	Diagonal,
	StandardTileExpectation,
	SectionCenterExpectation,
	PixelColorExpectation,
}
