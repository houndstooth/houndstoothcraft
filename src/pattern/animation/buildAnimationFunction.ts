import { callFunctionsPerSetting, clear, exportCanvas, getFromBaseOrDefaultPattern } from '../../app'
import * as from from '../../from'
import { state } from '../../state'
import * as to from '../../to'
import { codeUtilities, NullaryVoidPromise } from '../../utilities'
import { main as executePattern } from '../executePattern'
import { BasePattern } from '../types'
import { AnimationSettings } from './animationSettings'
import { AnimateParams, BuildAnimationFunctionParams, ConditionFunction, Frame } from './types'

const buildAnimationFunction: (_: BuildAnimationFunctionParams) => NullaryVoidPromise =
	(params: BuildAnimationFunctionParams): NullaryVoidPromise =>
		async (): Promise<void> => {
			const {
				animationFunctionObjects,
				layerFunctionObjects,
			}: BuildAnimationFunctionParams = params

			const { startFrame, refreshCanvas }: AnimationSettings = getFromBaseOrDefaultPattern.main('animationSettings')

			if (exportingFramesStillNeedsToCatchUp()) {
				return
			}

			if (shouldBeginShowingAnimation(startFrame)) {
				await animate({ layerFunctionObjects, refreshCanvas })
			}

			callFunctionsPerSetting.main({ settingsFunctionObjects: animationFunctionObjects })
			state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
		}

const exportingFramesStillNeedsToCatchUp: ConditionFunction =
	(): boolean => state.exportFrames && state.currentFrame > state.lastSavedFrame

const shouldBeginShowingAnimation: (startFrame: Frame) => boolean =
	(startFrame: Frame): boolean => state.currentFrame >= startFrame

const animate: (_: AnimateParams) => Promise<void> =
	async ({ layerFunctionObjects, refreshCanvas }: AnimateParams): Promise<void> => {
		if (refreshCanvas) {
			clear.main()
		}

		const preLayerSettings: Partial<BasePattern> = codeUtilities.deepClone(state.mainHoundstooth.basePattern)
		await executePattern({ layerFunctionObjects })
		Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

		if (state.exportFrames) {
			exportCanvas.main()
		}
	}

export { buildAnimationFunction as main }
