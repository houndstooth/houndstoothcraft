import { consoleWrapper } from '../dom'
import { state } from '../state'
import { ControlsState, ExecuteState, State } from '../types'
import executeGrid from './executeGrid'

const executeGridAndMaybeLogging: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		const { execute, controls }: State = state
		const { animating, currentFrame }: ControlsState = controls
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
