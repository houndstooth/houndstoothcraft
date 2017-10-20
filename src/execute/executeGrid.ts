import { mixDownContexts } from '../canvas'
import { state } from '../state'
import { callFunctionsPerSetting } from './callFunctionsPerSetting'
import { gridAndMaybeLogging } from './gridAndMaybeLogging'
import { Layer, SettingsFunctionObject } from './types'

const executeGrid: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => void = ({ layerFunctionObjects }) => {
	const { layerSettings } = state.mainHoundstooth.basePattern
	const { startLayer = 0 as any, endLayer = 0 as any } = layerSettings

	for (let currentLayer = 0; currentLayer <= endLayer; currentLayer++) {
		executeLayer({ currentLayer: currentLayer as any, startLayer, endLayer, layerFunctionObjects })
	}

	if (state.mixingDown) {
		mixDownContexts()
	}

	state.currentLayer = 0
}

const executeLayer: (_: {
	currentLayer: Layer, endLayer: Layer, layerFunctionObjects: SettingsFunctionObject[], startLayer: Layer,
}) => void = ({ currentLayer, endLayer, layerFunctionObjects, startLayer }) => {
	if (currentLayer >= startLayer || 0) {
		gridAndMaybeLogging()
	}
	if (currentLayer < endLayer) {
		callFunctionsPerSetting({ settingsFunctionObjects: layerFunctionObjects })
	}
	state.currentLayer++
}

export { executeGrid }
