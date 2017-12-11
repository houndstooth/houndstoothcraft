import { globalWrapper } from '../../utilities'
import { appState } from '../appState'
import { ControlsState } from '../controls'
import { AppState } from '../types'
import executeGrid from './executeGrid'
import { ExecuteState } from './types'

const executeGridAndMaybeLogging: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		const { execute, controls }: AppState = appState
		const { animating, currentFrame }: ControlsState = controls
		const { currentLayer, performanceLogging }: ExecuteState = execute

		if (performanceLogging) {
			globalWrapper.console.time('grid')
		}
		await executeGrid({ thisPatternRef })
		if (performanceLogging) {
			if (animating) {
				globalWrapper.console.log(`current animation frame / layer: ${currentFrame}/${currentLayer}`)
			}
			else {
				globalWrapper.console.log(`current layer: ${currentLayer}`)
			}
			globalWrapper.console.timeEnd('grid')
		}
	}

export default executeGridAndMaybeLogging
