import execute from './execute'
import clear from '../render/clear'
import composeMainHoundstooth from '../store/composeMainHoundstooth'
import store from '../../store'
import initialStore from '../../src/store/initialStore'
import cmyktoothEffect from '../../effects/cmyktooth/effects/cmyktoothEffect'
import ginghamChevronContinuumEffect from '../../effects/gingham-chevron-continuum/effects/ginghamChevronContinuumEffect'
import harmonitoothEffect from '../../effects/harmonitooth/effects/harmonitoothEffect'
import houndazzleEffect from '../../effects/houndazzle/effects/houndazzleEffect'
import houndazzleContinuumEffect from '../../effects/houndazzle/effects/houndazzleContinuumEffect'
import gongramEffect from '../../effects/gongram/effects/gongramEffect'
import houndsmorphosisEffect from '../../effects/houndsmorphosis/effects/houndsmorphosisEffect'
import codeUtilities from '../utilities/codeUtilities'

const addEffect = houndstoothEffect => store.selectedHoundstoothEffects.push(houndstoothEffect)

const removeEffect = houndstoothEffect => {
	store.selectedHoundstoothEffects = store.selectedHoundstoothEffects.filter(sHE => sHE.name !== houndstoothEffect.name)
}

const buildClickHandler = (checkbox, houndstoothEffect) => () => {
	store.mainHoundstooth = codeUtilities.deepClone(initialStore.INITIAL_MAIN_HOUNDSTOOTH)
	clear()

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

let controls = document.querySelector('.controls')

if (!controls) {
	controls = document.createElement('div')
	controls.classList.add('controls')

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

	document.body.appendChild(controls)
}

export default () => controls
