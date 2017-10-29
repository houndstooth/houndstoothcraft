type ConditionFunction = () => boolean

interface Frame extends Number {
	// tslint:disable-next-line:no-any
	_FrameBrand: any,
}

export {
	ConditionFunction,
	Frame,
}
