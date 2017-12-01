import { DECIMAL_RADIX } from '../../constants'
import { state } from '../../state'
import * as to from '../../to'
import { clearMixedDownContext } from '../canvas'
import { executeSelectedHoundstoothEffects } from '../execute'

const frameInputChangeHandler: (event: Event) => void =
	(event: Event): void => {
		const target: HTMLInputElement = event.target as HTMLInputElement
		state.currentFrame = to.Frame(parseInt(target.value, DECIMAL_RADIX))

		clearMixedDownContext.default()
		executeSelectedHoundstoothEffects.default()
	}

export default frameInputChangeHandler
