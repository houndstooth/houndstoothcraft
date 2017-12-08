// tslint:disable:no-any

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

interface Px extends Number {
	_PxBrand: any,
}

export {
	Dimensions,
	Px,
}
