// tslint:disable:no-any

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

type InsertElementRightAfter = (element: HTMLElement, elementRightAfterWhichToInsert: HTMLElement) => void

interface Px extends Number {
	_PxBrand: any,
}

export {
	Dimensions,
	InsertElementRightAfter,
	Px,
}
