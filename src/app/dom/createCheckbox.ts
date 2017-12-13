// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../types'
import { globalWrapper } from '../../utilities'
import { effectToggleClickHandler } from '../controls'
import makeId from './makeId'

const createCheckbox: (_: { effect: NamedEffect }) => HTMLInputElement =
	({ effect }: { effect: NamedEffect }): HTMLInputElement => {
		const checkbox: HTMLInputElement = globalWrapper.document.createElement('input')

		checkbox.setAttribute('type', 'checkbox')

		const idAndName: string = makeId(effect.name)
		checkbox.setAttribute('id', idAndName)
		checkbox.setAttribute('name', idAndName)

		checkbox.onclick = effectToggleClickHandler.default

		return checkbox
	}

export default createCheckbox
