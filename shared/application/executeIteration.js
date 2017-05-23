import state from './state'
import callFunctionsPerStateProperty from './callFunctionsPerStateProperty'

export default ({ pattern, iterations }) => {
	const { startIteration, endIteration } = state.iteration

	for (let n = 0; n <= endIteration; n++) {
		if (n >= startIteration) {
			pattern()
		}
		callFunctionsPerStateProperty({ functionObjects: iterations })
	}
}