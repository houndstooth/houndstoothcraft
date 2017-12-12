// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../types'
import { globalWrapper } from '../../utilities'
import makeId from './makeId'

const createLabel: (_: { effect: NamedEffect }) => HTMLLabelElement =
	({ effect }: { effect: NamedEffect }): HTMLLabelElement => {
		const label: HTMLLabelElement = globalWrapper.document.createElement('label')

		const name: Text = globalWrapper.document.createTextNode(effect.name)
		label.appendChild(name)
		label.setAttribute('for', makeId(effect.name))

		return label
	}

export default createLabel
