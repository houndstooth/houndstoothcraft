import { InputElement } from '../page'
import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { buildEffectToggleClickHandler } from './buildEffectToggleClickHandler'

const createCheckbox: (_: { houndstoothEffect: Effect }) => InputElement = ({ houndstoothEffect }) => {
	const checkbox = document.createElement('input')

	checkbox.setAttribute('type', 'checkbox')
	checkbox.classList.add(houndstoothEffect.name && houndstoothEffect.name.replace(/ /g, '-'))
	// tslint:disable-next-line:no-void-expression
	checkbox.onclick = buildEffectToggleClickHandler({ checkbox, houndstoothEffect })
	checkbox.style.cursor = 'pointer'

	return checkbox
}

export { createCheckbox }
