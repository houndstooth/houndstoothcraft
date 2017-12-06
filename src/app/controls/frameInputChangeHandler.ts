import { DECIMAL_RADIX } from '../../constants'
import { to } from '../../utilities'
import { clearMixedDownContext } from '../canvas'
import { executeSelectedHoundstoothEffects } from '../execute'
import { state } from '../state'

const frameInputChangeHandler: (event: Event) => void =
	(event: Event): void => {
		const target: HTMLInputElement = event.target as HTMLInputElement
		state.controls.currentFrame = to.Frame(parseInt(target.value, DECIMAL_RADIX))

		clearMixedDownContext.default()
		executeSelectedHoundstoothEffects.default()
	}

export default frameInputChangeHandler
