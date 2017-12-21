import { shouldRefreshCanvas } from '../../../pattern'
import { from, to } from '../../../utilities'
import { appState } from '../../appState'
import { updateCurrentFrame } from '../../controls'
import { clearContexts, mixDownContexts, saveCanvas } from '../../render'
import executePattern from '../executePattern'
import { ExecuteParams } from '../types'
import previousFrameHasFinished from './previousFrameHasFinished'

const buildAnimationFunction: (_: ExecuteParams) => () => Promise<void> =
	(executeParams: ExecuteParams): () => Promise<void> =>
		async (): Promise<void> => {
			if (!previousFrameHasFinished()) {
				return
			}

			if (shouldRefreshCanvas.default()) {
				clearContexts.default()
			}

			await executePattern(executeParams)

			mixDownContexts.default()

			if (appState.controls.exportFrames) {
				saveCanvas.default()
			}

			updateCurrentFrame.default(to.Frame(from.Frame(appState.controls.currentFrame) + 1))
		}

export default buildAnimationFunction
