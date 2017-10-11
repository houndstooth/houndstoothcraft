import { createContexts, createMixedDownCanvas } from '../page'
import state from '../state'
import prepareFunctionObjectsPerSetting from './prepareFunctionObjectsPerSetting'
import composeMainHoundstooth from './composeMainHoundstooth'
import executeGrid from './executeGrid'
import executeAnimation from './executeAnimation'
import SettingsFunctionObject from './SettingsFunctionObject'

type ExecuteSelectedHoundstoothEffects = { ({}?: { houndstoothOverrides? }): void }
const executeSelectedHoundstoothEffects: ExecuteSelectedHoundstoothEffects = ({ houndstoothOverrides } = {}) => {
	composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects, houndstoothOverrides })

	const layerFunctionObjects = prepareFunctionObjectsPerSetting({
		settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern,
	})

	prepareCanvas()

	execute({ layerFunctionObjects })
}

const prepareCanvas: { (): void } = () => {
	createContexts()
	if (state.exportFrames) {
		state.mixingDown = true
	}
	if (state.mixingDown) {
		state.mixedDownContext = createMixedDownCanvas()
	}
}

const execute: { ({}: { layerFunctionObjects: SettingsFunctionObject[] }): void } = ({ layerFunctionObjects }) => {
	if (state.animating) {
		const animationFunctionObjects = prepareFunctionObjectsPerSetting({
			settingsFunctionsSourcePattern: state.mainHoundstooth.animationsPattern,
		})
		executeAnimation({ animationFunctionObjects, layerFunctionObjects })
	}
	else {
		executeGrid({ layerFunctionObjects })
	}
}

export default executeSelectedHoundstoothEffects
