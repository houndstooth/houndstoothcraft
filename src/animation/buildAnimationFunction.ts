import { callFunctionsPerSetting, executePattern } from '../execute'
import { clear } from '../render'
import { state } from '../state'
import { AnimationSettings } from '../store'
import { getFromBaseOrDefaultPattern } from '../store/getFromBaseOrDefaultPattern'
import { BasePattern } from '../store/types'
import { deepClone } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { NullaryVoidPromise } from '../utilities/types'
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

		const preLayerSettings: Partial<BasePattern> = deepClone(state.mainHoundstooth.basePattern)
		await executePattern({ layerFunctionObjects })
		Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

		if (state.exportFrames) {
			exportFrame()
		}
	}

export { buildAnimationFunction }
