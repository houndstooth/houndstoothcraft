import { BasePattern } from './BasePattern'
import { PatternFunctions } from './PatternFunctions'

type Pattern = Partial<BasePattern> | PatternFunctions

export { Pattern }
