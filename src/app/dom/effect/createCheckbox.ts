// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../../types'
import { codeUtilities, globalWrapper } from '../../../utilities'
import { effectToggleHandler } from '../../controls'

const createCheckbox: (_: { effect: NamedEffect }) => HTMLInputElement =
	({ effect }: { effect: NamedEffect }): HTMLInputElement => {
		const checkbox: HTMLInputElement = globalWrapper.document.createElement('input')

		checkbox.setAttribute('type', 'checkbox')

		const idAndName: string = codeUtilities.idify(effect.name)
		checkbox.setAttribute('id', idAndName)
		checkbox.setAttribute('name', idAndName)

		checkbox.onclick = effectToggleHandler.default

		return checkbox
	}

export default createCheckbox
