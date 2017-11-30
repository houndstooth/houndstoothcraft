import { clearContexts, exportCanvas, getSetting, mixDownContexts } from '../../app'
import * as from from '../../from'
import { state } from '../../state'
import * as to from '../../to'
import { NullaryVoidPromise } from '../../utilities'
import executePattern from '../executePattern'
import { ExecuteParams } from '../types'

const buildAnimationFunction: (_: ExecuteParams) => NullaryVoidPromise =
	(params: ExecuteParams): NullaryVoidPromise =>
		async (): Promise<void> => {
			if (previousGridHasNotFinishedYet()) {
				return
			}

			await animate(params)

			state.currentFrame = to.Frame(from.Frame(state.currentFrame) + 1)
		}

const previousGridHasNotFinishedYet: () => boolean =
	(): boolean => state.tilesCompleted > 0

const animate: (_: ExecuteParams) => Promise<void> =
	async ({ animationFunctionObjects, layerFunctionObjects }: ExecuteParams): Promise<void> => {
		if (getSetting.default('refreshCanvas')) {
			clearContexts.default()
		}

		await executePattern({ animationFunctionObjects, layerFunctionObjects })

		mixDownContexts.default()

		if (state.exportFrames) {
			exportCanvas.default()
		}
	}

export default buildAnimationFunction
