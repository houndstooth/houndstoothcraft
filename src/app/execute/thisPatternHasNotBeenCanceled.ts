import { appState } from '../appState'

const thisPatternHasNotBeenCanceled: (patternRef: number) => boolean =
	(patternRef: number): boolean =>
		patternRef === appState.execute.patternRef

export default thisPatternHasNotBeenCanceled
