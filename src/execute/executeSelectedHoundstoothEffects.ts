import { createContexts, createMixedDownCanvas } from '../page'
import state from '../state'
import { Houndstooth } from '../store'
import prepareFunctionObjectsPerSetting from './prepareFunctionObjectsPerSetting'
import composeMainHoundstooth from './composeMainHoundstooth'
import executeGrid from './executeGrid'
import executeAnimation from './executeAnimation'
import { SettingsFunctionObject } from './types'
import { NullarySideEffector } from '../utilities/types'

const executeSelectedHoundstoothEffects: {
	({}?: { houndstoothOverrides?: Houndstooth }): void,
} = params => {
	const { houndstoothOverrides = {} } = params || {}
	composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects, houndstoothOverrides })

	const layerFunctionObjects = prepareFunctionObjectsPerSetting({
		settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern || {},
	})

	prepareCanvas()

	execute({ layerFunctionObjects })
}

const prepareCanvas: NullarySideEffector = (() => {
	createContexts()
	if (state.exportFrames) {
		state.mixingDown = true
	}
	if (state.mixingDown) {
		state.mixedDownContext = createMixedDownCanvas()
	}
}) as NullarySideEffector

const execute: { ({}: { layerFunctionObjects: SettingsFunctionObject[] }): void } = ({ layerFunctionObjects }) => {
	if (state.animating) {
		const animationFunctionObjects = prepareFunctionObjectsPerSetting({
			settingsFunctionsSourcePattern: state.mainHoundstooth.animationsPattern || {},
		})
		executeAnimation({ animationFunctionObjects, layerFunctionObjects })
	}
	else {
		executeGrid({ layerFunctionObjects })
	}
}

export default executeSelectedHoundstoothEffects
