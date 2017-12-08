// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import makeId from './makeId'
import { documentWrapper } from './windowWrapper'

const createLabel: (_: { effect: NamedEffect }) => HTMLLabelElement =
	({ effect }: { effect: NamedEffect }): HTMLLabelElement => {
		const label: HTMLLabelElement = documentWrapper.createElement('label') as HTMLLabelElement

		const name: HTMLTextAreaElement = documentWrapper.createTextNode(effect.name)
		label.appendChild(name)
		label.setAttribute('for', makeId(effect.name))

		return label
	}

export default createLabel
