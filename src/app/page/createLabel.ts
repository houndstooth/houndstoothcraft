// tslint:disable:no-unsafe-any

import { Effect } from '../../pattern/types'
import { documentWrapper } from '../../utilities/windowWrapper'
import { createCheckbox } from './createCheckbox'
import { InputElement, LabelElement } from './types'

const createLabel: (_: { houndstoothEffect: Effect }) => LabelElement =
	({ houndstoothEffect }: { houndstoothEffect: Effect }): LabelElement => {
		const label: LabelElement = documentWrapper.createElement('label')

		const checkbox: InputElement = createCheckbox({ houndstoothEffect })
		label.appendChild(checkbox)

		const name: HTMLTextAreaElement = documentWrapper.createTextNode(houndstoothEffect.name)
		label.appendChild(name)

		return label
	}

export { createLabel }
