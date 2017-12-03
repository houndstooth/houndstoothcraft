// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import { documentWrapper } from '../../utilities'
import { buildEffectToggleClickHandler } from '../ui'
import makeId from './makeId'
import { InputElement } from './types'

const createCheckbox: (_: { houndstoothEffect: NamedEffect }) => InputElement =
	({ houndstoothEffect }: { houndstoothEffect: NamedEffect }): InputElement => {
		const checkbox: InputElement = documentWrapper.createElement('input')

		checkbox.setAttribute('type', 'checkbox')
		checkbox.setAttribute('id', makeId(houndstoothEffect.name))
		checkbox.onclick = buildEffectToggleClickHandler.default({ checkbox, houndstoothEffect })

		return checkbox
	}

export default createCheckbox
