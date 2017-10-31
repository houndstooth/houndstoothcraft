import { clear } from '../canvas'
import { callFunctionsPerSetting, executeGrid } from '../execute'
import { state } from '../state'
import { AnimationSettings } from '../store'
import { getFromBaseOrDefaultPattern } from '../store/getFromBaseOrDefaultPattern'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { NullarySideEffector } from '../utilities/types'
import { exportFrame } from './exportFrame'
import { AnimateParams, BuildAnimationFunctionParams, ConditionFunction, Frame } from './types'
import { BasePattern } from '../store/types'
import { deepClone } from '../utilities/codeUtilities'

const buildAnimationFunction: (_: BuildAnimationFunctionParams) => NullarySideEffector =
	(params: BuildAnimationFunctionParams): NullarySideEffector =>
		(): void => {
			const {
				animationFunctionObjects,
				layerFunctionObjects,
			}: BuildAnimationFunctionParams = params

			const { startFrame, refreshCanvas }: AnimationSettings = getFromBaseOrDefaultPattern('animationSettings')

			if (exportingFramesStillNeedsToCatchUp()) {
				return
			}

			if (shouldBeginShowingAnimation(startFrame)) {
				animate({ layerFunctionObjects, refreshCanvas })
			}

			callFunctionsPerSetting({ settingsFunctionObjects: animationFunctionObjects })
			state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
		}

const exportingFramesStillNeedsToCatchUp: ConditionFunction =
	(): boolean => state.exportFrames && state.currentFrame > state.lastSavedFrame

const shouldBeginShowingAnimation: (startFrame: Frame) => boolean =
	(startFrame: Frame): boolean => state.currentFrame >= startFrame

const animate: (_: AnimateParams) => void =
	({ layerFunctionObjects, refreshCanvas }: AnimateParams): void => {
		if (refreshCanvas) {
			clear()
		}

		const preLayerSettings: Partial<BasePattern> = deepClone(state.mainHoundstooth.basePattern)
		executeGrid({ layerFunctionObjects })
		Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

		if (state.exportFrames) {
			exportFrame()
		}
	}

export { buildAnimationFunction }
