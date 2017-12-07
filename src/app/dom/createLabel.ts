// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import makeId from './makeId'
import { LabelElement } from './types'
import { documentWrapper } from './windowWrapper'

const createLabel: (_: { effect: NamedEffect }) => LabelElement =
	({ effect }: { effect: NamedEffect }): LabelElement => {
		const label: LabelElement = documentWrapper.createElement('label')

		const name: HTMLTextAreaElement = documentWrapper.createTextNode(effect.name)
		label.appendChild(name)
		label.setAttribute('for', makeId(effect.name))

		return label
	}

export default createLabel
