import controls from './controls'
import execute from './execute'
import storeStuff from './store'

const { setupEffectToggles } = controls
const { executeSelectedHoundstoothEffects } = execute
const { initialStore } = storeStuff

export default {
	executeSelectedHoundstoothEffects,
	setupEffectToggles,
	initialStore,
}
