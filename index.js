import setup from './shared/application/setup'
import execute from './shared/application/execute'

import standard from './standard/standard'
// import houndsmorphosis from './houndsmorphosis/houndsmorphosis'

// import cmyktoothPreset from './cmyktooth/cmyktoothPreset'
import ginghamChevronContinuumPreset from './gingham-chevron-continuum/ginghamChevronContinuumPreset'
// import harmonitoothPreset from './harmonitooth/harmonitoothPreset'
// import houndazzlePreset from './houndazzle/houndazzlePreset'
// import houndazzleContinuumPreset from './houndazzle/houndazzleContinuumPreset'
// import gongramPreset from './gongram/gongramPreset'

const presets = [
	// cmyktoothPreset,
	ginghamChevronContinuumPreset,
	// harmonitoothPreset,
	// houndazzlePreset,
	// gongramPreset,
	// houndazzleContinuumPreset
]

setup({ presets })
// console.log(state)

execute({
	pattern: standard,
	iterating: false,
	animating: false,
	exportFrames: false
})
