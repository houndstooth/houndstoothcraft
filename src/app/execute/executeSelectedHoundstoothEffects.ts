import { Effect } from '../../pattern'
import { codeUtilities, NullarySideEffector } from '../../utilities'
import { createContexts } from '../dom'
import { composeMainHoundstooth, prepareFunctionObjectsPerSetting, SettingsFunctionObject } from '../settings'
import { state } from '../state'
import executeAnimation from './executeAnimation'
import executePattern from './executePattern'

const executeSelectedHoundstoothEffects: (_?: { houndstoothOverrides?: Effect }) => void =
	({ houndstoothOverrides = {} }: { houndstoothOverrides?: Effect } = {}): void => {
		composeMainHoundstooth.default({
			houndstoothEffects: state.controls.selectedHoundstoothEffects,
			houndstoothOverrides,
		})

		prepareCurrentPattern()

		prepareCanvas()

		execute()
	}

const prepareCurrentPattern: NullarySideEffector =
	(): void => {
		state.settings.currentPattern = codeUtilities.deepClone(state.settings.mainHoundstooth.basePattern)
	}

const prepareCanvas: NullarySideEffector =
	(): void => {
		createContexts.default()
	}

const execute: NullarySideEffector =
	(): void => {
		const animationFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting.default({
			settingsFunctionsSourcePattern: state.settings.mainHoundstooth.animationsPattern,
		})
		const layerFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting.default({
			settingsFunctionsSourcePattern: state.settings.mainHoundstooth.layersPattern,
		})

		if (state.controls.animating) {
			executeAnimation({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
		else {
			executePattern({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
	}

export default executeSelectedHoundstoothEffects
