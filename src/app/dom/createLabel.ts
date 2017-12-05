// tslint:disable:no-unsafe-any

import { NamedEffect } from '../../pattern'
import makeId from './makeId'
import { LabelElement } from './types'
import { documentWrapper } from './windowWrapper'

const createLabel: (_: { houndstoothEffect: NamedEffect }) => LabelElement =
	({ houndstoothEffect }: { houndstoothEffect: NamedEffect }): LabelElement => {
		const label: LabelElement = documentWrapper.createElement('label')

		const name: HTMLTextAreaElement = documentWrapper.createTextNode(houndstoothEffect.name)
		label.appendChild(name)
		label.setAttribute('for', makeId(houndstoothEffect.name))

		return label
	}

export default createLabel