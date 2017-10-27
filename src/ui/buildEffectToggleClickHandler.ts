import { executeSelectedHoundstoothEffects } from '../execute'
import { InputElement } from '../page'
import { state } from '../state'
import { Effect } from '../store'
import { NullarySideEffector } from '../utilities/types'
import { resetInterface } from './resetInterface'

const buildEffectToggleClickHandler: (_: {
	checkbox: InputElement, houndstoothEffect: Effect,
}) => NullarySideEffector = ({ checkbox, houndstoothEffect }) => () => {
	resetInterface()

	const effectFunction = checkbox.checked ? addEffect : removeEffect
	effectFunction(houndstoothEffect)

	executeSelectedHoundstoothEffects()
}

const addEffect: (houndstoothEffect: Effect) => void = houndstoothEffect => {
	state.selectedHoundstoothEffects.push(houndstoothEffect)
}

const removeEffect: (houndstoothEffect: Effect) => void = houndstoothEffect => {
	state.selectedHoundstoothEffects = state.selectedHoundstoothEffects.filter(selectedHoundstoothEffect =>
		selectedHoundstoothEffect.name !== houndstoothEffect.name)
}

export { buildEffectToggleClickHandler }
