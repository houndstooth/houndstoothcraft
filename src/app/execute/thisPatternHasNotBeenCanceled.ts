import { appState } from '../appState'

const thisPatternHasNotBeenCanceled: (patternId: number) => boolean =
	(patternId: number): boolean =>
		patternId === appState.execute.patternId

export default thisPatternHasNotBeenCanceled
