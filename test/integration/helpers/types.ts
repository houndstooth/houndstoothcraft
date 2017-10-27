import { Address } from '../../../src/components/types/Address'
import { Unit } from '../../../src/components/types/Unit'
import { Color } from '../../../src/render'
import { Coordinate } from '../../../src/space'

interface ExpectedSection {
	areaOrigin: Coordinate,
	areaSize: Unit,
	baseId?: number,
}

interface ExpectedDividedSection extends ExpectedSection {
	colors: [ Color, Color ],
}

interface ExpectedSolidSection extends ExpectedSection {
	color: Color,
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
	areaOrigin: Coordinate,
	areaSize: Unit,
	color: Color,
	id?: number,
	sectionAddress: Address[],
	sectionResolution: number,
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
