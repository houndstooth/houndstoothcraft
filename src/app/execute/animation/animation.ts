import { shouldRefreshCanvas } from '../../../pattern'
import { from, to } from '../../../utilities'
import { appState } from '../../appState'
import { updateCurrentFrame } from '../../controls'
import { clearContexts, mixDownContexts, saveCanvas } from '../../render'
import executePattern from '../pattern/executePattern'
import { ExecuteParams } from '../types'
import clearAnimationIntervalAndRemoveFromState from './clearAnimationIntervalAndRemoveFromState'

const animation: (_: ExecuteParams) => Promise<void> =
	async (executeParams: ExecuteParams): Promise<void> => {
		if (isPaused()) {
			return
		}

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
		maybeResolveAnimation()
	}

const maybeResolveAnimation: () => void =
	(): void => {
		if (appState.controls.endFrame !== to.Frame(0) && appState.controls.currentFrame > appState.controls.endFrame) {
			appState.execute.resolveAnimation()
			clearAnimationIntervalAndRemoveFromState()
		}
	}

const isPaused: () => boolean =
	(): boolean =>
		!appState.controls.animating

const previousFrameHasFinished: () => boolean =
	(): boolean =>
		appState.execute.tilesCompleted === 0 && from.Layer(appState.execute.currentLayer) === 0

export default animation
