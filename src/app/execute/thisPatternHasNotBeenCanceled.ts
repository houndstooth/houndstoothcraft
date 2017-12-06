import { state } from '../state'

const thisPatternHasNotBeenCanceled: (patternRef: number) => boolean =
	(patternRef: number): boolean =>
		patternRef === state.execute.patternRef

export default thisPatternHasNotBeenCanceled
