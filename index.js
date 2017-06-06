import setup from './application/setup'
import execute from './application/execute'

import cmyktoothPreset from './variations/cmyktooth/cmyktoothPreset'
import ginghamChevronContinuumPreset from './variations/gingham-chevron-continuum/ginghamChevronContinuumPreset'
import harmonitoothPreset from './variations/harmonitooth/harmonitoothPreset'
import houndazzlePreset from './variations/houndazzle/houndazzlePreset'
import houndazzleContinuumPreset from './variations/houndazzle/houndazzleContinuumPreset'
import gongramPreset from './variations/gongram/gongramPreset'
import houndsmorphosisPreset from './variations/houndsmorphosis/houndsmorphosisPreset'

const presets = [
	// cmyktoothPreset,
	// ginghamChevronContinuumPreset,
	// harmonitoothPreset,
	// houndazzlePreset,
	// gongramPreset,
	// houndazzleContinuumPreset,
	houndsmorphosisPreset
]

setup({ presets })

execute({
	iterating: true,
	animating: false,
	exportFrames: false
})
