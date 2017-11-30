import { Effect, executeAnimation, executePattern } from '../../pattern'
import { state } from '../../state'
import { codeUtilities, NullarySideEffector } from '../../utilities'
import { createContexts } from '../page'
import composeMainHoundstooth from './composeMainHoundstooth'
import prepareFunctionObjectsPerSetting from './prepareFunctionObjectsPerSetting'
import { SettingsFunctionObject } from './types'

const executeSelectedHoundstoothEffects: (_?: { houndstoothOverrides?: Effect }) => void =
	({ houndstoothOverrides = {} }: { houndstoothOverrides?: Effect } = {}): void => {
		composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects, houndstoothOverrides })

		prepareCurrentPattern()

		const layerFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
			settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern,
		})

		prepareCanvas()

		execute({ layerFunctionObjects })
	}

const prepareCurrentPattern: NullarySideEffector =
	(): void => {
		state.currentPattern = codeUtilities.deepClone(state.mainHoundstooth.basePattern)
	}

const prepareCanvas: NullarySideEffector =
	(): void => {
		createContexts.default()
	}

const execute: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => void =
	({ layerFunctionObjects }: { layerFunctionObjects: SettingsFunctionObject[] }): void => {
		if (state.animating) {
			const animationFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
				settingsFunctionsSourcePattern: state.mainHoundstooth.animationsPattern,
			})
			executeAnimation.default({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
		else {
			executePattern.default({ layerFunctionObjects }).then().catch()
		}
	}

export default executeSelectedHoundstoothEffects
