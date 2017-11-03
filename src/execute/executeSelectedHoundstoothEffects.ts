import { createContexts, createMixedDownContext } from '../page'
import { state } from '../state'
import { Effect } from '../store'
import { NullarySideEffector } from '../utilities/types'
import { composeMainHoundstooth } from './composeMainHoundstooth'
import { executeAnimation } from './executeAnimation'
import { executePattern } from './executePattern'
import { prepareFunctionObjectsPerSetting } from './prepareFunctionObjectsPerSetting'
import { SettingsFunctionObject } from './types'

const executeSelectedHoundstoothEffects: (_?: { houndstoothOverrides?: Effect }) => Promise<void> =
	async ({ houndstoothOverrides = {} }: { houndstoothOverrides?: Effect } = {}): Promise<void> => {
		composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects, houndstoothOverrides })

		const layerFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
			settingsFunctionsSourcePattern: state.mainHoundstooth.layersPattern,
		})

		prepareCanvas()

		await execute({ layerFunctionObjects })
	}

const prepareCanvas: NullarySideEffector =
	(): void => {
		createContexts()
		if (state.exportFrames) {
			state.mixingDown = true
		}
		if (state.mixingDown) {
			state.mixedDownContext = createMixedDownContext()
		}
	}

const execute: (_: { layerFunctionObjects: SettingsFunctionObject[] }) => Promise<void> =
	async ({ layerFunctionObjects }: { layerFunctionObjects: SettingsFunctionObject[] }): Promise<void> => {
		if (state.animating) {
			const animationFunctionObjects: SettingsFunctionObject[] = prepareFunctionObjectsPerSetting({
				settingsFunctionsSourcePattern: state.mainHoundstooth.animationsPattern,
			})
			await executeAnimation({ animationFunctionObjects, layerFunctionObjects })
		}
		else {
			await executePattern({ layerFunctionObjects })
		}
	}

export { executeSelectedHoundstoothEffects }
