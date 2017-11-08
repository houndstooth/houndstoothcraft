// tslint:disable:no-unsafe-any

import { Effect } from '../../pattern/types'
import { documentWrapper } from '../../utilities/windowWrapper'
import { buildEffectToggleClickHandler } from '../ui'
import { InputElement } from './types'

const createCheckbox: (_: { houndstoothEffect: Effect }) => InputElement =
	({ houndstoothEffect }: { houndstoothEffect: Effect }): InputElement => {
		const checkbox: InputElement = documentWrapper.createElement('input')

		checkbox.setAttribute('type', 'checkbox')
		checkbox.classList.add(houndstoothEffect.name && houndstoothEffect.name.replace(/ /g, '-'))
		// tslint:disable-next-line:no-void-expression
		checkbox.onclick = buildEffectToggleClickHandler({ checkbox, houndstoothEffect })

		return checkbox
	}

export { createCheckbox }
