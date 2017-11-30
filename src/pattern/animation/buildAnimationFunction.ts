import { callFunctionsPerSetting, clearContexts, exportCanvas, getSetting, mixDownContexts } from '../../app'
import * as from from '../../from'
import { state } from '../../state'
import * as to from '../../to'
import { NullaryVoidPromise } from '../../utilities'
import executePattern from '../executePattern'
import { AnimationSettings } from './animationSettings'
import { AnimateParams, BuildAnimationFunctionParams, Frame } from './types'

const buildAnimationFunction: (_: BuildAnimationFunctionParams) => NullaryVoidPromise =
	(params: BuildAnimationFunctionParams): NullaryVoidPromise =>
		async (): Promise<void> => {
			if (previousGridHasNotFinishedYet()) {
				return
			}

			const {
				animationFunctionObjects,
				layerFunctionObjects,
			}: BuildAnimationFunctionParams = params

			const { startFrame, refreshCanvas }: AnimationSettings = getSetting.default('animationSettings')

			if (shouldBeginShowingAnimation(startFrame)) {
				await animate({ layerFunctionObjects, refreshCanvas })
			}

			callFunctionsPerSetting.default({ settingsFunctionObjects: animationFunctionObjects })
			state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
		}

const previousGridHasNotFinishedYet: () => boolean =
	(): boolean => state.tilesCompleted > 0

const shouldBeginShowingAnimation: (startFrame: Frame) => boolean =
	(startFrame: Frame): boolean => state.currentFrame >= startFrame

const animate: (_: AnimateParams) => Promise<void> =
	async ({ layerFunctionObjects, refreshCanvas }: AnimateParams): Promise<void> => {
		if (refreshCanvas) {
			clearContexts.default()
		}

		await executePattern({ layerFunctionObjects })

		mixDownContexts.default()

		if (state.exportFrames) {
			exportCanvas.default()
		}
	}

export default buildAnimationFunction
