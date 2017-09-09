import controls from './controls'
import execute from './execute'
import store from './store'

const { setupEffectToggles } = controls
const { executeSelectedHoundstoothEffects } = execute
const { initialState } = store

export default {
	executeSelectedHoundstoothEffects,
	setupEffectToggles,
	initialState,
}
