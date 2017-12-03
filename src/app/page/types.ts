// tslint:disable:no-any

import { MockCanvas, MockContext, MockElement, MockInputElement } from '../../../test'

type Canvas = HTMLCanvasElement | MockCanvas

type Context = CanvasRenderingContext2D | MockContext

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

type InputElement = HTMLInputElement | MockInputElement

type LabelElement = HTMLLabelElement | MockElement

type PageElement = HTMLElement | MockElement

interface Px extends Number {
	_PxBrand: any,
}

export {
	Canvas,
	Context,
	Dimensions,
	InputElement,
	LabelElement,
	PageElement,
	Px,
}
