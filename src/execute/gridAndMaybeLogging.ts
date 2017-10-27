import { grid } from '../components'
import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'
import { console } from '../utilities/windowWrapper'

const gridAndMaybeLogging: NullarySideEffector = () => {
	const { performanceLogging, animating, currentFrame, currentLayer } = state
	if (performanceLogging) {
		console.time('grid')
	}
	grid()
	if (performanceLogging) {
		if (animating) {
			console.log(`current animation frame / layer: ${currentFrame}/${currentLayer}`)
		}
		else {
			console.log(`current layer: ${currentLayer}`)
		}
		console.timeEnd('grid')
	}
}

export { gridAndMaybeLogging }
