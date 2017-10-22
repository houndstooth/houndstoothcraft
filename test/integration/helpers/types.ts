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

export {
	ExpectedSection,
	ExpectedDividedSection,
	ExpectedSolidSection,
	ExpectDiagonalDividedSection,
	ExpectSolidSection,
	Diagonal,
}
