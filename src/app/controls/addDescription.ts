// tslint:disable:no-unsafe-any

import { documentWrapper } from '../../utilities'
import { PageElement } from '../dom'

const addDescription: (descriptionText: string) => void =
	(descriptionText: string): void => {
		const description: PageElement = documentWrapper.createElement('span')
		description.innerHTML = descriptionText

		const descriptionsContainer: PageElement = documentWrapper.querySelector('#descriptions-container')

		descriptionsContainer.appendChild(description)
	}

export default addDescription
