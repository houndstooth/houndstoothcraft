// tslint:disable:no-unsafe-any

import { Effect } from '../store'
import { buildEffectToggleClickHandler } from '../ui/buildEffectToggleClickHandler'
import { document } from '../utilities/windowWrapper'
import { InputElement } from './types'

const createCheckbox: (_: { houndstoothEffect: Effect }) => InputElement =
	({ houndstoothEffect }: { houndstoothEffect: Effect }): InputElement => {
		const checkbox: InputElement = document.createElement('input')

		checkbox.setAttribute('type', 'checkbox')
		checkbox.classList.add(houndstoothEffect.name && houndstoothEffect.name.replace(/ /g, '-'))
		// tslint:disable-next-line:no-void-expression
		checkbox.onclick = buildEffectToggleClickHandler({ checkbox, houndstoothEffect })

		return checkbox
	}

export { createCheckbox }
