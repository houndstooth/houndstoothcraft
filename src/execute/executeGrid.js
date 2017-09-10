import state from '../../state'
import callFunctionsPerSetting from './callFunctionsPerSetting'
import components from '../components'
import canvas from '../canvas'
import consoleWrapper from '../utilities/consoleWrapper'

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

const gridAndMaybeLogging = () => {
	const { performanceLogging, animating, currentAnimationFrame, currentLayer } = state
	if (performanceLogging) consoleWrapper.time('grid')
	components.grid()
	if (performanceLogging) {
		if (animating) {
			consoleWrapper.log(`current animation frame / layer: ${currentAnimationFrame}/${currentLayer}`)
		}
		else {
			consoleWrapper.log(`current layer: ${currentLayer}`)
		}
		consoleWrapper.timeEnd('grid')
	}
}
