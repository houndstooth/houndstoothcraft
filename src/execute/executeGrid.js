import state from '../../state'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import canvas from '../canvas'
import gridAndMaybeLogging from './gridAndMaybeLogging'

export default ({ layerFunctions }) => {
	let { startLayer, endLayer } = state.mainHoundstooth.basePattern.layerSettings || {}
	startLayer = startLayer || 0

	for (let n = 0; n <= endLayer; n++) {
		if (n >= startLayer) {
			gridAndMaybeLogging()
		}
		if (n < endLayer) {
			callFunctionsPerSetting({ settingsFunctions: layerFunctions })
		}
		state.currentLayer++
	}

	if (state.mixingDown) canvas.mixDownContexts()

	state.currentLayer = 0
}
