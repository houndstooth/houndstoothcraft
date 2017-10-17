import state from '../state'
import { mixDownContexts } from '../canvas'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import gridAndMaybeLogging from './gridAndMaybeLogging'
import { SettingsFunctionObject } from './types'

const executeGrid: { ({}: { layerFunctionObjects: SettingsFunctionObject[] }): void } = ({ layerFunctionObjects }) => {
	const basePattern = state.mainHoundstooth.basePattern || {}
	const layerSettings = basePattern.layerSettings || {}
	const { startLayer = 0, endLayer = 0 } = layerSettings

	for (let n = 0; n <= endLayer; n++) {
		executeLayer({ n, startLayer, endLayer, layerFunctionObjects })
	}

	if (state.mixingDown) {
		mixDownContexts()
	}

	state.currentLayer = 0
}

const executeLayer: {
	({}: { endLayer: number, layerFunctionObjects: SettingsFunctionObject[], n: number, startLayer: number }): void,
} = ({ endLayer, layerFunctionObjects, n, startLayer }) => {
	if (n >= startLayer || 0) {
		gridAndMaybeLogging()
	}
	if (n < endLayer) {
		callFunctionsPerSetting({ settingsFunctionObjects: layerFunctionObjects })
	}
	state.currentLayer++
}

export default executeGrid
