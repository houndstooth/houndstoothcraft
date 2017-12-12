import {
	Address,
	Color,
	Coordinate,
	Unit,
} from '../../../src/indexForTest'

interface DrawPassMarker {
	coordinateUnderTest: Coordinate,
	id: number,
	passed: boolean,
}

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

type Key = [ string, number | undefined ]

type PixelIsColor = (coordinateUnderTest: Coordinate, expectedColor: Color) => boolean

interface CheckColorProperties {
	actualColor: Color,
	expectedColor: Color,
	i: number,
}

interface StandardTileExpectation {
	baseId: number,
	colors: Color[],
	tileOrigin: Coordinate,
	tileSize: Unit
}

interface SectionCenterParams {
	areaOrigin: Coordinate,
	areaSize: Unit,
	sectionAddress: Address,
	sectionResolution: number,
}

interface SectionCenterExpectation extends SectionCenterParams {
	color: Color,
	id?: number,
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
