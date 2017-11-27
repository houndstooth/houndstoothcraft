// tslint:disable:no-unsafe-any

import { state } from '../../state'
import { State } from '../../types'
import { consoleWrapper } from '../../utilities'
import executeGrid from './executeGrid'

const executeGridAndMaybeLogging: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		const { performanceLogging, animating, currentFrame, currentLayer }: State = state
		if (performanceLogging) {
			consoleWrapper.time('grid')
		}
		await executeGrid({ thisPatternRef })
		if (performanceLogging) {
			if (animating) {
				consoleWrapper.log(`current animation frame / layer: ${currentFrame}/${currentLayer}`)
			}
			else {
				consoleWrapper.log(`current layer: ${currentLayer}`)
			}
			consoleWrapper.timeEnd('grid')
		}
	}

export default executeGridAndMaybeLogging
