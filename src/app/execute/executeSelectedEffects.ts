import { Effect } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { createContexts } from '../dom'
import {
	composeMainHoundstooth,
	prepareFunctionObjectsPerSetting,
	resetPatternState,
	SettingsFunctionObject,
} from '../settings'
import executeAnimation from './executeAnimation'
import executePattern from './executePattern'

const executeSelectedEffects: (_?: { overrides?: Effect }) => void =
	({ overrides = {} }: { overrides?: Effect } = {}): void => {
		composeMainHoundstooth.default({
			effects: appState.controls.selectedEffects,
			overrides,
		})

		resetPatternState.default()

		prepareCanvas()

		execute()
	}

const prepareCanvas: NullarySideEffector =
	(): void => {
		createContexts.default()
	}

const execute: NullarySideEffector =
	(): void => {
		const animationFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting.default({
			settingsFunctionsSourcePattern: appState.settings.mainHoundstooth.animationsPattern,
		})
		const layerFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting.default({
			settingsFunctionsSourcePattern: appState.settings.mainHoundstooth.layersPattern,
		})

		if (appState.controls.animating) {
			executeAnimation({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
		else {
			executePattern({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
	}

export default executeSelectedEffects
