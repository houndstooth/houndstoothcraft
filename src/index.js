import animation from './animation'
import components from './components'
import ui from './ui'
import execute from './execute'
import space from './space'
import render from './render'
import store from './store'

const { standardAnimation } = animation
const { perStripe, tileCenter } = components
const { setupEffectToggles } = ui
const { executeSelectedHoundstoothEffects } = execute
const { rotateCoordinateAboutPoint } = space
const { solid } = render
const { houndstoothDefaults } = store

export default {
	executeSelectedHoundstoothEffects,
	houndstoothDefaults,
	perStripe,
	rotateCoordinateAboutPoint,
	setupEffectToggles,
	solid,
	standardAnimation,
	tileCenter,
}
