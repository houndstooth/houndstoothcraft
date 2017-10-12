import { document } from '../utilities/windowWrapper'
import { Houndstooth } from '../store'
import buildEffectToggleClickHandler from './buildEffectToggleClickHandler'

const createCheckbox: { ({}: { houndstoothEffect: Houndstooth }): HTMLInputElement } = ({ houndstoothEffect }) => {
	const checkbox = document.createElement('input')

	checkbox.setAttribute('type', 'checkbox')
	checkbox.classList.add(houndstoothEffect.name.replace(/ /g, '-'))
	checkbox.onclick = buildEffectToggleClickHandler({ checkbox, houndstoothEffect })
	checkbox.style.cursor = 'pointer'

	return checkbox
}

export default createCheckbox
