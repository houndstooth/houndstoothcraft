import { clearContexts, exportCanvas, getSetting, mixDownContexts, updateCurrentFrame } from '../../app'
import * as from from '../../from'
import { state } from '../../state'
import * as to from '../../to'
import { NullaryVoidPromise } from '../../utilities'
import executePattern from '../executePattern'
import { ExecuteParams } from '../types'
import previousFrameHasFinished from './previousFrameHasFinished'

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

			if (state.exportFrames) {
				exportCanvas.default()
			}

			updateCurrentFrame.default(to.Frame(from.Frame(state.currentFrame) + 1))
		}

export default buildAnimationFunction
