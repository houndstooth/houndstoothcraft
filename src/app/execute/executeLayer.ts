import { initializePatternState } from '../../pattern'
import { appState } from '../appState'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import executeGridAndMaybeLogging from './executeGridAndMaybeLogging'
import { ExecuteLayerParams } from './types'

const executeLayer: (_: ExecuteLayerParams) => Promise<void> =
	async ({ layer, layerFunctionObjects, frameId }: ExecuteLayerParams): Promise<void> => {
		appState.execute.currentLayer = layer

		callFunctionsPerSetting({ settingFunctionObjects: layerFunctionObjects })

		initializePatternState.default(appState.settings.currentPattern)

		await executeGridAndMaybeLogging({ frameId })
	}

export default executeLayer
