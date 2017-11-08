import { state } from '../../state'

const thisPatternHasNotBeenCanceled: (patternRef: number) => boolean =
	(patternRef: number): boolean =>
		patternRef === state.patternRef

export { thisPatternHasNotBeenCanceled }
