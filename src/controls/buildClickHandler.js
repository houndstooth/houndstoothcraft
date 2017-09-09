import store from '../../store'
import resetInterface from './resetInterface'
import executeSelectedHoundstoothEffects from '../controls/executeSelectedHoundstoothEffects'

const addEffect = houndstoothEffect => store.selectedHoundstoothEffects.push(houndstoothEffect)

const removeEffect = houndstoothEffect => {
	store.selectedHoundstoothEffects = store.selectedHoundstoothEffects.filter(selectedHoundstoothEffect => {
		return selectedHoundstoothEffect.name !== houndstoothEffect.name
	})
}

export default (checkbox, houndstoothEffect) => () => {
	resetInterface()

	checkbox.checked ? addEffect(houndstoothEffect) : removeEffect(houndstoothEffect)

	executeSelectedHoundstoothEffects()
}
