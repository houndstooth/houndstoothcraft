import { shouldRefreshCanvas } from '../../../pattern'
import { from, to } from '../../../utilities'
import { appState } from '../../appState'
import { updateCurrentFrame } from '../../controls'
import { clearContexts, mixDownContexts, saveCanvas } from '../../render'
import executeFrame from '../executeFrame'
import previousFrameHasFinished from './previousFrameHasFinished'
import { ExecuteParams } from '../types'

const buildAnimationFunction: (_: ExecuteParams) => () => Promise<void> =
	(executeParams: ExecuteParams): () => Promise<void> =>
		async (): Promise<void> => {
			if (!previousFrameHasFinished()) {
				return
			}

			if (shouldRefreshCanvas.default()) {
				clearContexts.default()
			}

			await executeFrame(executeParams)

			mixDownContexts.default()

			if (appState.controls.exportFrames) {
				saveCanvas.default()
			}

			updateCurrentFrame.default(to.Frame(from.Frame(appState.controls.currentFrame) + 1))
		}

export default buildAnimationFunction
