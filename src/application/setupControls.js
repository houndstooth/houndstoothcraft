import controls from '../interface/controls'
import execute from './execute'
import clear from '../render/clear'
import composeMainHoundstooth from '../store/composeMainHoundstooth'
import store from '../../store'
import cmyktoothEffect from '../../effects/cmyktooth/effects/cmyktoothEffect'
import ginghamChevronContinuumEffect from '../../effects/gingham-chevron-continuum/effects/ginghamChevronContinuumEffect'
import harmonitoothEffect from '../../effects/harmonitooth/effects/harmonitoothEffect'
import houndazzleEffect from '../../effects/houndazzle/effects/houndazzleEffect'
import houndazzleContinuumEffect from '../../effects/houndazzle/effects/houndazzleContinuumEffect'
import gongramEffect from '../../effects/gongram/effects/gongramEffect'
import houndsmorphosisEffect from '../../effects/houndsmorphosis/effects/houndsmorphosisEffect'
import warnings from '../interface/warnings'
import resetStore from '../store/resetStore'

const addEffect = houndstoothEffect => store.selectedHoundstoothEffects.push(houndstoothEffect)

const removeEffect = houndstoothEffect => {
	store.selectedHoundstoothEffects = store.selectedHoundstoothEffects.filter(selectedHoundstoothEffect => {
		return selectedHoundstoothEffect.name !== houndstoothEffect.name
	})
}

const resetEverything = () => {
	warnings.innerHTML = ''
	clear()
	clearInterval(store.interval)
	const existingEffects = store.selectedHoundstoothEffects.slice()
	resetStore(store)
	store.selectedHoundstoothEffects = existingEffects
}

const buildClickHandler = (checkbox, houndstoothEffect) => () => {
	resetEverything()

	checkbox.checked ? addEffect(houndstoothEffect) : removeEffect(houndstoothEffect)
	composeMainHoundstooth({ houndstoothEffects: store.selectedHoundstoothEffects })

	execute()
}

const addHoundstoothEffectToggleToControls = houndstoothEffect => {
	const checkbox = document.createElement('input')
	checkbox.setAttribute('type', 'checkbox')
	checkbox.classList.add(houndstoothEffect.name.replace(/ /g, '-'))
	checkbox.onclick = buildClickHandler(checkbox, houndstoothEffect)

	const span = document.createElement('span')
	span.innerHTML = houndstoothEffect.name

	const checkboxContainer = document.createElement('div')
	checkboxContainer.appendChild(checkbox)
	checkboxContainer.appendChild(span)

	controls.appendChild(checkboxContainer)
}

export default () => {
	const houndstoothEffects = [
		cmyktoothEffect,
		ginghamChevronContinuumEffect,
		harmonitoothEffect,
		houndazzleContinuumEffect,
		houndazzleEffect,
		gongramEffect,
		houndsmorphosisEffect,
	]

	houndstoothEffects.forEach(addHoundstoothEffectToggleToControls)
}
