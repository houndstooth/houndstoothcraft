import { Effect, executeAnimation, executePattern } from '../../pattern'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { createContexts, createMixedDownContext } from '../page'
import { main as composeMainHoundstooth } from './composeMainHoundstooth'
import { main as prepareFunctionObjectsPerSetting } from './prepareFunctionObjectsPerSetting'
import { SettingsFunctionObject } from './types'

const executeSelectedHoundstoothEffects: (_?: { houndstoothOverrides?: Effect }) => void =
	({ houndstoothOverrides = {} }: { houndstoothOverrides?: Effect } = {}): void => {
		composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects, houndstoothOverrides })

		const layerFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
			settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern,
		})

		prepareCanvas()

		execute({ layerFunctionObjects })
	}

const prepareCanvas: NullarySideEffector =
	(): void => {
		createContexts.main()
		if (state.exportFrames) {
			state.mixingDown = true
		}
		if (state.mixingDown) {
			state.mixedDownContext = createMixedDownContext.default()
		}
	}

const execute: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => void =
	({ layerFunctionObjects }: { layerFunctionObjects: SettingsFunctionObject[] }): void => {
		if (state.animating) {
			const animationFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
				settingsFunctionsSourcePattern: state.mainHoundstooth.animationsPattern,
			})
			executeAnimation.main({ animationFunctionObjects, layerFunctionObjects }).then().catch()
		}
		else {
			executePattern.main({ layerFunctionObjects }).then().catch()
		}
	}

export { executeSelectedHoundstoothEffects as main }
