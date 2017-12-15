// tslint:disable:member-ordering

import { PatternBaseValues, PatternFunctions } from './pattern'

interface Color {
	r?: number,
	g?: number,
	b?: number,
	a: number,

	[_: string]: number | undefined,
}

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

	[_: string]: Pattern | string
}

type Effect = Partial<Houndstooth>

interface NamedEffect extends Effect {
	description: string,
	name: string,
}

type Pattern = PatternBaseValues | PatternFunctions

export {
	Color,
	Effect,
	Frame,
	Houndstooth,
	Layer,
	NamedEffect,
	Pattern,
}
