import { to } from '../../../utilities'
import { appState } from '../../appState'
import { updateAnimatingState, updateOverrideNodes } from '../../controls'
import { createContexts, updateOverrides } from '../../dom'
import {
	combineEffects,
	composeMainHoundstooth,
	initializeCurrentPatternFromBasePattern,
	prepareFunctionObjectsPerSetting,
	SettingFunctionObject,
} from '../../setting'
import { executeAnimation } from '../animation'
import { executePattern } from '../pattern'

const executeEffect: () => void =
	(): void => {
		combineEffects.default()
		composeMainHoundstooth.default()

		updateAnimatingState.default()

		updateOverrideNodes.default()
		updateOverrides.default()

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
		const animationFunctionObjects: SettingFunctionObject[] = prepareFunctionObjectsPerSetting.default({
			settingFunctionsSourcePattern: appState.settings.mainHoundstooth.animationsPattern,
		})
		const layerFunctionObjects: SettingFunctionObject[] = prepareFunctionObjectsPerSetting.default({
			settingFunctionsSourcePattern: appState.settings.mainHoundstooth.layersPattern,
		})

		if (appState.controls.animating) {
			executeAnimation.default({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
		else {
			executePattern.default({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
	}

export default executeEffect
