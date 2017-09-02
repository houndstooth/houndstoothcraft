import addEffectToggle from '../interface/addEffectToggle'
import cmyktoothEffect from '../../effects/cmyktooth/effects/cmyktoothEffect'
import ginghamChevronContinuumEffect from '../../effects/gingham-chevron-continuum/effects/ginghamChevronContinuumEffect'
import harmonitoothEffect from '../../effects/harmonitooth/effects/harmonitoothEffect'
// import houndazzleEffect from '../../effects/houndazzle/effects/houndazzleEffect'
import gongramEffect from '../../effects/gongram/effects/gongramEffect'
import houndsmorphosisEffect from '../../effects/houndsmorphosis/effects/houndsmorphosisEffect'

export default () => {
	const houndstoothEffects = [
		cmyktoothEffect,
		ginghamChevronContinuumEffect,
		harmonitoothEffect,
		// houndazzleEffect,
		gongramEffect,
		houndsmorphosisEffect,
	]

	houndstoothEffects.forEach(addEffectToggle)
}
