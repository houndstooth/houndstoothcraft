// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import { buildEffectToggleClickHandler } from '../controls'
import makeId from './makeId'
import { InputElement } from './types'
import { documentWrapper } from './windowWrapper'

const createCheckbox: (_: { effect: NamedEffect }) => InputElement =
	({ effect }: { effect: NamedEffect }): InputElement => {
		const checkbox: InputElement = documentWrapper.createElement('input')

		checkbox.setAttribute('type', 'checkbox')

		const idAndName: string = makeId(effect.name)
		checkbox.setAttribute('id', idAndName)
		checkbox.setAttribute('name', idAndName)

		checkbox.onclick = buildEffectToggleClickHandler.default({ checkbox, effect })

		return checkbox
	}

export default createCheckbox
