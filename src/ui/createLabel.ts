import { LabelElement } from '../page'
import { Houndstooth } from '../store'
import { document } from '../utilities/windowWrapper'
import createCheckbox from './createCheckbox'

const createLabel: (_: { houndstoothEffect: Houndstooth }) => LabelElement = ({ houndstoothEffect }) => {
	const label = document.createElement('label')

	label.style.cursor = 'pointer'
	label.style.display = 'block'

	const checkbox = createCheckbox({ houndstoothEffect })
	label.appendChild(checkbox)

	const name = document.createTextNode(houndstoothEffect.name)
	label.appendChild(name)

	return label
}

export default createLabel
