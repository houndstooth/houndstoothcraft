import { document } from '../utilities/windowWrapper'
import buildEffectToggleClickHandler from './buildEffectToggleClickHandler'

const createCheckbox = houndstoothEffect => {
	const checkbox = document.createElement('input')

	checkbox.setAttribute('type', 'checkbox')
	checkbox.classList.add(houndstoothEffect.name.replace(/ /g, '-'))
	checkbox.onclick = buildEffectToggleClickHandler(checkbox, houndstoothEffect)
	checkbox.style.cursor = 'pointer'

	return checkbox
}

export default createCheckbox