import animation from './animation'
import components from './components'
import ui from './ui'
import execute from './execute'
import space from './space'
import render from './render'
import * as store from './store'

const { standardAnimation } = animation
const { perStripe, tileCenter } = components
const { addEffectToggles } = ui
const { executeSelectedHoundstoothEffects } = execute
const { rotateCoordinateAboutPoint } = space
const { solid } = render
const { houndstoothDefaults } = store

export default {
	executeSelectedHoundstoothEffects,
	houndstoothDefaults,
	perStripe,
	rotateCoordinateAboutPoint,
	addEffectToggles,
	solid,
	standardAnimation,
	tileCenter,
}
