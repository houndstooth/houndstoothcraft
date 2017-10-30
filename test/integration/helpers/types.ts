import { Frame } from '../../../src/animation/types'
import { Address, Unit } from '../../../src/components'
import { Layer } from '../../../src/execute/types'
import { Color } from '../../../src/render'
import { Coordinate } from '../../../src/space'

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

interface ThisFrameOnly {
	readonly endFrame: Frame,
	readonly startFrame: Frame
}

interface ThisLayerOnly {
	readonly endLayer: Layer,
	readonly startLayer: Layer
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
	StandardTileExpectation,
	SectionCenterParams,
	SectionCenterExpectation,
	PixelColorExpectation,
	ThisFrameOnly,
	ThisLayerOnly,
}
