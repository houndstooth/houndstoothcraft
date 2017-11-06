// tslint:disable:no-unsafe-any

import { executeGrid } from '../execute'
import { state } from '../state'
import { State } from '../store'
import { console } from '../utilities/windowWrapper'

const executeGridAndMaybeLogging: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		const { performanceLogging, animating, currentFrame, currentLayer }: State = state
		if (performanceLogging) {
			console.time('grid')
		}
		await executeGrid({ thisPatternRef })
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
