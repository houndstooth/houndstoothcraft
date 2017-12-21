import { globalWrapper } from '../../../utilities'
import { appState } from '../../appState'
import { ControlsState } from '../../controls'
import { AppState } from '../../types'
import { ExecuteState } from '../types'
import executeGrid from './executeGrid'

const executeGridAndMaybeLogging: (_: { patternId: number }) => Promise<void> =
	async ({ patternId }: { patternId: number }): Promise<void> => {
		const { execute, controls }: AppState = appState
		const { animating, currentFrame }: ControlsState = controls
		const { currentLayer, performanceLogging }: ExecuteState = execute

		if (performanceLogging) {
			globalWrapper.console.time('grid')
		}
		await executeGrid({ patternId })
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
