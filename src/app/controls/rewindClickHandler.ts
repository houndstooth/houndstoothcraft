import { state } from '../../state'
import * as to from '../../to'
import { NullarySideEffector } from '../../utilities'
import { clearMixedDownContext } from '../canvas'
import { clearInterval, executeSelectedHoundstoothEffects } from '../execute'
import updateCurrentFrame from './updateCurrentFrame'

const rewindClickHandler: NullarySideEffector =
	(): void => {
		clearInterval.default('animationInterval')

		updateCurrentFrame(to.Frame(0))

		if (!state.controls.animating) {
			state.dom.rewindButton.disabled = true
			clearMixedDownContext.default()
		}

		executeSelectedHoundstoothEffects.default()
	}

export default rewindClickHandler
