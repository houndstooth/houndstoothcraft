import { clearContexts, exportCanvas, getSetting, mixDownContexts, updateCurrentFrame } from '../'
import { from, NullaryVoidPromise, to } from '../../utilities'
import { state } from '../state'
import executePattern from './executePattern'
import previousFrameHasFinished from './previousFrameHasFinished'
import { ExecuteParams } from './types'

const buildAnimationFunction: (_: ExecuteParams) => NullaryVoidPromise =
	(params: ExecuteParams): NullaryVoidPromise =>
		async (): Promise<void> => {
			if (!previousFrameHasFinished()) {
				return
			}

			if (getSetting.default('refreshCanvas')) {
				clearContexts.default()
			}

			await executePattern(params)

			mixDownContexts.default()

			if (state.controls.exportFrames) {
				exportCanvas.default()
			}

			updateCurrentFrame.default(to.Frame(from.Frame(state.controls.currentFrame) + 1))
		}

export default buildAnimationFunction
