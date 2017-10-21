import { BasePattern } from './BasePattern'
import { PatternFunctions } from './PatternFunctions'

interface Houndstooth {
	animationsPattern: PatternFunctions,
	basePattern: Partial<BasePattern>,
	layersPattern: PatternFunctions,
	name: string,
}

export { Houndstooth }
