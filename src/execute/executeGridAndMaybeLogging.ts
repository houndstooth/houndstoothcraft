// tslint:disable:no-unsafe-any

import { executeGrid } from '../execute'
import { state } from '../state'
import { State } from '../store'
import { NullaryVoidPromise } from '../utilities/types'
import { console } from '../utilities/windowWrapper'

const executeGridAndMaybeLogging: NullaryVoidPromise =
	async (): Promise<void> => {
		const { performanceLogging, animating, currentFrame, currentLayer }: State = state
		if (performanceLogging) {
			console.time('grid')
		}
		await executeGrid()
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

export { executeGridAndMaybeLogging }
