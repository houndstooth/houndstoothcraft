import { state } from '../../state'
import { ExecuteState, State } from '../../types'
import { consoleWrapper } from '../../utilities'
import executeGrid from './executeGrid'

const executeGridAndMaybeLogging: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		const { execute, animating, currentFrame }: State = state
		const { currentLayer, performanceLogging }: ExecuteState = execute

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
