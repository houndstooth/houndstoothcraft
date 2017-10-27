import { MockElement } from '../../test/types/MockElement'
import { MockContext } from '../../test/types/MockContext'
import { MockCanvas } from '../../test/types/MockCanvas'

type Canvas = HTMLCanvasElement | MockCanvas

type Context = CanvasRenderingContext2D | MockContext

type DataBlob = Blob | {}

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

type InputElement = HTMLInputElement | {
	checked?: any,
	onclick?: any,
	style?: {
		cursor?: any,
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
