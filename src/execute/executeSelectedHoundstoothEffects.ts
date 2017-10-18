import { createContexts, createMixedDownCanvas } from '../page'
import state from '../state'
import { Houndstooth } from '../store'
import { NullarySideEffector } from '../utilities/types'
import composeMainHoundstooth from './composeMainHoundstooth'
import executeAnimation from './executeAnimation'
import executeGrid from './executeGrid'
import prepareFunctionObjectsPerSetting from './prepareFunctionObjectsPerSetting'
import { SettingsFunctionObject } from './types'

const executeSelectedHoundstoothEffects: (_?: { houndstoothOverrides?: Houndstooth }) => void = params => {
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

const execute: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => void = ({ layerFunctionObjects }) => {
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
