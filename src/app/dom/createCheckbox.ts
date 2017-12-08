// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import { buildEffectToggleClickHandler } from '../controls'
import makeId from './makeId'
import { documentWrapper } from './windowWrapper'

const createCheckbox: (_: { effect: NamedEffect }) => HTMLInputElement =
	({ effect }: { effect: NamedEffect }): HTMLInputElement => {
		const checkbox: HTMLInputElement = documentWrapper.createElement('input') as HTMLInputElement

		checkbox.setAttribute('type', 'checkbox')

		const idAndName: string = makeId(effect.name)
		checkbox.setAttribute('id', idAndName)
		checkbox.setAttribute('name', idAndName)

		checkbox.onclick = buildEffectToggleClickHandler.default({ checkbox, effect })

		return checkbox
	}

export default createCheckbox
