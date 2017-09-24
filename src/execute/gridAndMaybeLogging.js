import state from '../state'
import consoleWrapper from '../utilities/consoleWrapper'
import { grid } from '../components'

const gridAndMaybeLogging = () => {
	const { performanceLogging, animating, currentAnimationFrame, currentLayer } = state
	if (performanceLogging) consoleWrapper.time('grid')
	grid()
	if (performanceLogging) {
		if (animating) {
			consoleWrapper.log(`current animation frame / layer: ${currentAnimationFrame}/${currentLayer}`)
		}
		else {
			consoleWrapper.log(`current layer: ${currentLayer}`)
		}
		consoleWrapper.timeEnd('grid')
	}
}

export default gridAndMaybeLogging
