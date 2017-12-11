import {
	Address,
	Color,
	Coordinate,
	Unit,
} from '../../../src/indexForTest'

interface DrawPassMarker {
	readonly coordinateUnderTest: Coordinate,
	readonly id: number,
	readonly passed: boolean,
}

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

type Key = [ string, number | undefined ]

type PixelIsColor = (coordinateUnderTest: Coordinate, expectedColor: Color) => boolean

interface CheckColorProperties {
	readonly actualColor: Color,
	readonly expectedColor: Color,
	readonly i: number,
}

interface StandardTileExpectation {
	baseId: number,
	colors: Color[],
	tileOrigin: Coordinate,
	tileSize: Unit
}

interface SectionCenterParams {
	readonly areaOrigin: Coordinate,
	readonly areaSize: Unit,
	readonly sectionAddress: Address,
	readonly sectionResolution: number,
}

interface SectionCenterExpectation extends SectionCenterParams {
	readonly color: Color,
	readonly id?: number,
}

interface PixelColorExpectation {
	coordinateUnderTest: Coordinate,
	expectedColor: Color,
	id: number
}

export {
	CheckColorProperties,
	Diagonal,
	DrawPassMarker,
	ExpectedSection,
	ExpectedDividedSection,
	ExpectedSolidSection,
	ExpectDiagonalDividedSection,
	ExpectSolidSection,
	Key,
	PixelIsColor,
	StandardTileExpectation,
	SectionCenterParams,
	SectionCenterExpectation,
	PixelColorExpectation,
}
