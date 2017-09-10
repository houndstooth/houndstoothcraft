import animation from './animation'
import components from './components'
import controls from './controls'
import execute from './execute'
import outlines from './outlines'
import render from './render'
import store from './store'

const { standardAnimation } = animation
const { perStripe, tileCenter } = components
const { setupEffectToggles } = controls
const { executeSelectedHoundstoothEffects } = execute
const { rotateOutlineAboutPoint } = outlines
const { solid } = render
const { houndstoothDefaults } = store

export default {
	executeSelectedHoundstoothEffects,
	houndstoothDefaults,
	perStripe,
	rotateOutlineAboutPoint,
	setupEffectToggles,
	solid,
	standardAnimation,
	tileCenter,
}
