import state from '../state'
import { executeSelectedHoundstoothEffects } from '../execute'
import resetInterface from './resetInterface'

const buildEffectToggleClickHandler = (checkbox, houndstoothEffect) => () => {
	resetInterface()

	checkbox.checked ? addEffect(houndstoothEffect) : removeEffect(houndstoothEffect)

	executeSelectedHoundstoothEffects()
}

const addEffect = houndstoothEffect => state.selectedHoundstoothEffects.push(houndstoothEffect)

const removeEffect = houndstoothEffect => {
	state.selectedHoundstoothEffects = state.selectedHoundstoothEffects.filter(selectedHoundstoothEffect => {
		return selectedHoundstoothEffect.name !== houndstoothEffect.name
	})
}

export default buildEffectToggleClickHandler
