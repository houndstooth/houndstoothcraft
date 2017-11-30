import { NullarySideEffector } from '../../utilities'

type ConditionFunction = () => boolean

interface AnimationParams {
	animationFunction: NullarySideEffector,
	resolveAnimation: NullarySideEffector,
}

interface Frame extends Number {
	// tslint:disable-next-line:no-any
	_FrameBrand: any,
}

export {
	AnimationParams,
	ConditionFunction,
	Frame,
}
