import { PatternBaseValues, PatternFunctions } from './pattern'

interface Frame extends Number {
	// tslint:disable-next-line:no-any
	_FrameBrand: any,
}

interface Layer extends Number {
	// tslint:disable-next-line:no-any
	_LayerBrand: any,
}

interface Houndstooth {
	animationsPattern: PatternFunctions,
	basePattern: PatternBaseValues,
	layersPattern: PatternFunctions,
}

type Effect = Partial<Houndstooth>

interface NamedEffect extends Effect {
	description: string,
	name: string,
}

type Pattern = PatternBaseValues | PatternFunctions

export {
	Effect,
	Frame,
	Houndstooth,
	Layer,
	NamedEffect,
	Pattern,
}
