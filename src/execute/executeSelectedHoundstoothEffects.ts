import { createContexts, createMixedDownCanvas } from '../page'
import state from '../state'
import prepareFunctionsPerSetting from './prepareFunctionsPerSetting'
import composeMainHoundstooth from './composeMainHoundstooth'
import executeGrid from './executeGrid'
import executeAnimation from './executeAnimation'

const executeSelectedHoundstoothEffects = ({ houndstoothOverrides = {} } = {}) => {
	composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects, houndstoothOverrides })

	const layerFunctions = prepareFunctionsPerSetting({
		settingsFunctions: state.mainHoundstooth.layersPattern,
	})

	prepareCanvas()

	execute(layerFunctions)
}

const prepareCanvas = () => {
	createContexts()
	if (state.exportFrames) {
		state.mixingDown = true
	}
	if (state.mixingDown) {
		state.mixedDownContext = createMixedDownCanvas()
	}
}

const execute = layerFunctions => {
	if (state.animating) {
		const animationFunctions = prepareFunctionsPerSetting({
			settingsFunctions: state.mainHoundstooth.animationsPattern,
		})
		executeAnimation({ animationFunctions, layerFunctions })
	}
	else {
		executeGrid({ layerFunctions })
	}
}

export default executeSelectedHoundstoothEffects
