// tslint:disable:no-unsafe-any

import { Effect } from '../../pattern'
import { documentWrapper } from '../../utilities'
import { buildEffectToggleClickHandler } from '../ui'
import { InputElement } from './types'

const createCheckbox: (_: { houndstoothEffect: Effect }) => InputElement =
	({ houndstoothEffect }: { houndstoothEffect: Effect }): InputElement => {
		const checkbox: InputElement = documentWrapper.createElement('input')

		checkbox.setAttribute('type', 'checkbox')
		checkbox.classList.add(houndstoothEffect.name && houndstoothEffect.name.replace(/ /g, '-'))
		checkbox.onclick = buildEffectToggleClickHandler.default({ checkbox, houndstoothEffect })

		return checkbox
	}

export default createCheckbox
