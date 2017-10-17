import { executeSelectedHoundstoothEffects } from '../execute'
import { InputElement } from '../page'
import state from '../state'
import { Houndstooth } from '../store'
import resetInterface from './resetInterface'

const buildEffectToggleClickHandler: {
	({}: { checkbox: InputElement, houndstoothEffect: Houndstooth }): void,
} = ({ checkbox, houndstoothEffect }) => () => {
	resetInterface()

	const effectFunction = checkbox.checked ? addEffect : removeEffect
	effectFunction(houndstoothEffect)

	executeSelectedHoundstoothEffects()
}

const addEffect: { (houndstoothEffect: Houndstooth): void } = houndstoothEffect => {
	state.selectedHoundstoothEffects.push(houndstoothEffect)
}

const removeEffect: { (houndstoothEffect: Houndstooth): void } = houndstoothEffect => {
	state.selectedHoundstoothEffects = state.selectedHoundstoothEffects.filter(selectedHoundstoothEffect =>
		selectedHoundstoothEffect.name !== houndstoothEffect.name)
}

export default buildEffectToggleClickHandler
