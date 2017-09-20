import animation from './animation'
import * as components from './components'
import * as execute from './execute'
import * as render from './render'
import * as space from './space'
import * as store from './store'
import * as ui from './ui'

const { standardAnimation } = animation
const { perStripe, tileCenter } = components
const { executeSelectedHoundstoothEffects } = execute
const { solid } = render
const { rotateCoordinateAboutPoint } = space
const { houndstoothDefaults } = store
const { addEffectToggles } = ui

export default {
	addEffectToggles,
	executeSelectedHoundstoothEffects,
	houndstoothDefaults,
	perStripe,
	rotateCoordinateAboutPoint,
	solid,
	standardAnimation,
	tileCenter,
}
