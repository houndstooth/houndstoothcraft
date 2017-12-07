import { clearContexts, exportCanvas, getSetting, mixDownContexts, updateCurrentFrame } from '../'
import { from, NullaryVoidPromise, to } from '../../utilities'
import { appState } from '../appState'
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

			if (appState.controls.exportFrames) {
				exportCanvas.default()
			}

			updateCurrentFrame.default(to.Frame(from.Frame(appState.controls.currentFrame) + 1))
		}

export default buildAnimationFunction
