// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../types'
import { globalWrapper } from '../../utilities'
import { buildEffectToggleClickHandler } from '../controls'
import makeId from './makeId'

const createCheckbox: (_: { effect: NamedEffect }) => HTMLInputElement =
	({ effect }: { effect: NamedEffect }): HTMLInputElement => {
		const checkbox: HTMLInputElement = globalWrapper.document.createElement('input')

		checkbox.setAttribute('type', 'checkbox')

		const idAndName: string = makeId(effect.name)
		checkbox.setAttribute('id', idAndName)
		checkbox.setAttribute('name', idAndName)

		checkbox.onclick = buildEffectToggleClickHandler.default({ checkbox, effect })

		return checkbox
	}

export default createCheckbox
