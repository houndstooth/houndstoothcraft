import { initializePatternState } from '../../../pattern'
import { appState } from '../../appState'
import callFunctionsPerSetting from '../callFunctionsPerSetting'
import { executeGrid } from '../grid'

import { ExecuteLayerParams } from './types'

const executeLayer: (_: ExecuteLayerParams) => Promise<void> =
	async ({ layer, layerFunctionObjects, patternId }: ExecuteLayerParams): Promise<void> => {
		appState.execute.currentLayer = layer

		callFunctionsPerSetting({ settingFunctionObjects: layerFunctionObjects })

		initializePatternState.default(appState.settings.currentPattern)

		await executeGrid.wrapper.executeGrid({ patternId })
	}

export const wrapper = { executeLayer }
