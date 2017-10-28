import { MockCanvas } from '../../test/types/MockCanvas'
import { MockContext } from '../../test/types/MockContext'
import { MockElement } from '../../test/types/MockElement'

type Canvas = HTMLCanvasElement | MockCanvas

type Context = CanvasRenderingContext2D | MockContext

type DataBlob = Blob | {}

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

type InputElement = HTMLInputElement | {
	checked?: {},
	onclick?: {},
	style?: {
		cursor?: {},
	},
}

type LabelElement = HTMLLabelElement | {}

type PageElement = HTMLElement | MockElement

interface Px extends Number {
	// tslint:disable-next-line:no-any
	_PxBrand: any
}

export {
	Canvas,
	Context,
	DataBlob,
	Dimensions,
	InputElement,
	LabelElement,
	PageElement,
	Px,
}
