import './settings/settings'
import './settings/current'
import setup from './application/setup'
import execute from './application/execute'

// import cmyktoothEffect from './effects/cmyktooth/cmyktoothEffect'
// import ginghamChevronContinuumEffect from './effects/gingham-chevron-continuum/ginghamChevronContinuumEffect'
// import harmonitoothEffect from './effects/harmonitooth/harmonitoothEffect'
// import houndazzleEffect from './effects/houndazzle/houndazzleEffect'
// import houndazzleContinuumEffect from './effects/houndazzle/houndazzleContinuumEffect'
// import gongramEffect from './effects/gongram/gongramEffect'
// import houndsmorphosisEffect from './effects/houndsmorphosis/houndsmorphosisEffect'

setup({
	effects: [],
	configurationLogging: false
})

execute({
	iterating: false,
	animating: false,
	exportFrames: false,
	performanceLogging: false
})
