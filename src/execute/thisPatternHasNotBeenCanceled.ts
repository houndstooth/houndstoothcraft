import { state } from '../state'

const thisPatternHasNotBeenCancelled: (patternRef: number) => boolean =
	(patternRef: number): boolean =>
		patternRef === state.patternRef

export { thisPatternHasNotBeenCancelled }
