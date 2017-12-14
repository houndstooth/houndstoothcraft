import { to } from '../../utilities'
import { appState } from '../appState'
import { createContexts } from '../dom'
import {
	composeMainHoundstooth,
	initializeCurrentPatternFromBasePattern,
	prepareFunctionObjectsPerSetting,
	SettingsFunctionObject,
} from '../settings'
import executeAnimation from './executeAnimation'
import executePattern from './executePattern'

const executeSelectedEffects: () => void =
	(): void => {
		composeMainHoundstooth.default()

		initializeCurrentPatternFromBasePattern.default()
		setEndLayer()

		prepareCanvas()

		execute()
	}

const setEndLayer: () => void =
	(): void => {
		appState.controls.endLayer = appState.settings.currentPattern.layerSettings.endLayer || to.Layer(0)
	}

const prepareCanvas: () => void =
	(): void => {
		createContexts.default()
	}

const execute: () => void =
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
