import state from './state'
import iterate from './iteration/iterate'

export default ({ pattern, iterations }) => {
	const { startIteration, endIteration } = state.iteration

	for (let n = 0; n <= endIteration; n++) {
		if (n >= startIteration) {
			pattern()
		}
		iterate({ iterations })
	}
}