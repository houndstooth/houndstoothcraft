import state from './state'
import executeIteration from './executeIteration'

export default ({ pattern, iterations }) => {
	if (state.iteration.iterating) {
		executeIteration({ pattern, iterations })
	} else {
		// console.time('pattern');
		pattern()
		// console.timeEnd('pattern');
	}
}