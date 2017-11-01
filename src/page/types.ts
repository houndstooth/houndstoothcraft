// tslint:disable:no-any

import { MockCanvas, MockContext, MockElement } from '../../test/helpers/types'

type Canvas = HTMLCanvasElement | MockCanvas

type Context = CanvasRenderingContext2D | MockContext

type DataBlob = Blob | {}

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

type InputElement = HTMLInputElement | {
	checked?: any,
	classList?: any,
	onclick?: any,
	setAttribute?: any,
	style: {
		cursor?: any,
	},
}

type LabelElement = HTMLLabelElement | MockElement

type PageElement = HTMLElement | MockElement

interface Px extends Number {
	_PxBrand: any,
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
