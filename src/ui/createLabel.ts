// tslint:disable:no-unsafe-any

import { InputElement, LabelElement } from '../page'
import { Effect } from '../store'
import { document } from '../utilities/windowWrapper'
import { createCheckbox } from './createCheckbox'

const createLabel: (_: { houndstoothEffect: Effect }) => LabelElement =
	({ houndstoothEffect }: { houndstoothEffect: Effect }): LabelElement => {
		const label: LabelElement = document.createElement('label')

		label.style.cursor = 'pointer'
		label.style.display = 'block'

		const checkbox: InputElement = createCheckbox({ houndstoothEffect })
		label.appendChild(checkbox)

		const name: HTMLTextAreaElement = document.createTextNode(houndstoothEffect.name)
		label.appendChild(name)

		return label
	}

export { createLabel }
