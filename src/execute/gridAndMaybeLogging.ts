// tslint:disable:no-unsafe-any

import { grid } from '../components'
import { state } from '../state'
import { State } from '../store'
import { NullarySideEffector } from '../utilities/types'
import { console } from '../utilities/windowWrapper'

const gridAndMaybeLogging: NullarySideEffector =
	(): void => {
		const { performanceLogging, animating, currentFrame, currentLayer }: State = state
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
