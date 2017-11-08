import { callFunctionsPerSetting, clear } from '../../app'
import { getFromBaseOrDefaultPattern } from '../../app/store/getFromBaseOrDefaultPattern'
import * as from from '../../from'
import { state } from '../../state'
import * as to from '../../to'
import { codeUtilities, NullaryVoidPromise } from '../../utilities'
import { executePattern } from '../executePattern'
import { BasePattern } from '../types'
import { AnimationSettings } from './animationSettings'
import { exportFrame } from './exportFrame'
import { AnimateParams, BuildAnimationFunctionParams, ConditionFunction, Frame } from './types'

const buildAnimationFunction: (_: BuildAnimationFunctionParams) => NullaryVoidPromise =
	(params: BuildAnimationFunctionParams): NullaryVoidPromise =>
		async (): Promise<void> => {
			const {
				animationFunctionObjects,
				layerFunctionObjects,
			}: BuildAnimationFunctionParams = params

			const { startFrame, refreshCanvas }: AnimationSettings = getFromBaseOrDefaultPattern('animationSettings')

			if (exportingFramesStillNeedsToCatchUp()) {
				return
			}

			if (shouldBeginShowingAnimation(startFrame)) {
				await animate({ layerFunctionObjects, refreshCanvas })
			}

			callFunctionsPerSetting({ settingsFunctionObjects: animationFunctionObjects })
			state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
		}

const exportingFramesStillNeedsToCatchUp: ConditionFunction =
	(): boolean => state.exportFrames && state.currentFrame > state.lastSavedFrame

const shouldBeginShowingAnimation: (startFrame: Frame) => boolean =
	(startFrame: Frame): boolean => state.currentFrame >= startFrame

const animate: (_: AnimateParams) => Promise<void> =
	async ({ layerFunctionObjects, refreshCanvas }: AnimateParams): Promise<void> => {
		if (refreshCanvas) {
			clear()
		}

		const preLayerSettings: Partial<BasePattern> = codeUtilities.deepClone(state.mainHoundstooth.basePattern)
		await executePattern({ layerFunctionObjects })
		Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

		if (state.exportFrames) {
			exportFrame()
		}
	}

export { buildAnimationFunction }
