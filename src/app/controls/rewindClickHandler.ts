import { NullarySideEffector, to } from '../../utilities'
import { appState } from '../appState'
import { clearMixedDownContext } from '../canvas'
import { clearInterval, executeSelectedEffects } from '../execute'
import updateCurrentFrame from './updateCurrentFrame'

const rewindClickHandler: NullarySideEffector =
	(): void => {
		clearInterval.default('animationInterval')

		updateCurrentFrame(to.Frame(0))

		if (!appState.controls.animating) {
			appState.dom.rewindButton.disabled = true
			clearMixedDownContext.default()
		}

		executeSelectedEffects.default()
	}

export default rewindClickHandler
