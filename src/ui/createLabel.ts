import { document } from '../utilities/windowWrapper'
import { Houndstooth } from '../store'
import createCheckbox from './createCheckbox'

const createLabel: { ({}: { houndstoothEffect: Houndstooth }): any } = ({ houndstoothEffect }) => {
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
