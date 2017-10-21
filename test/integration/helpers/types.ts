import { Units } from '../../../src/components/types/Units'
import { Color } from '../../../src/render'
import { Coordinate } from '../../../src/space'

interface ExpectedSection {
	areaOrigin: Coordinate,
	areaSize: Units,
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

enum Diagonal {
	Solid,
	Minor,
	Principal,
	SolidButTestPrincipalToAvoidSeam,
	SolidButTestMinorToAvoidSeam,
}

export {
	ExpectedSection,
	ExpectedDividedSection,
	ExpectedSolidSection,
	ExpectDiagonalDividedSection,
	ExpectSolidSection,
	Diagonal,
}
