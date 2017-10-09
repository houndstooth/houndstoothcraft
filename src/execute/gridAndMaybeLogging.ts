import state from '../state'
import { console } from '../utilities/windowWrapper'
import { grid } from '../components'

const gridAndMaybeLogging = () => {
	const { performanceLogging, animating, currentAnimationFrame, currentLayer } = state
	if (performanceLogging) {
		console.time('grid')
	}
	grid()
	if (performanceLogging) {
		if (animating) {
			console.log(`current animation frame / layer: ${currentAnimationFrame}/${currentLayer}`)
		}
		else {
			console.log(`current layer: ${currentLayer}`)
		}
		console.timeEnd('grid')
	}
}

export default gridAndMaybeLogging
