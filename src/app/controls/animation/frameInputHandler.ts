import { to } from '../../../utilities'
import { appState } from '../../appState'
import { executeEffect } from '../../execute'
import { clearMixedDownContext } from '../../render'

const DECIMAL_RADIX: number = 10

const frameInputHandler: (_: Event) => void =
	(event: Event): void => {
		const target: HTMLInputElement = event.target as HTMLInputElement
		appState.controls.currentFrame = to.Frame(parseInt(target.value, DECIMAL_RADIX))

		clearMixedDownContext.default()
		executeEffect.default()
	}

export default frameInputHandler
