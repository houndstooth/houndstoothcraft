import { state } from '../../state'
import { documentWrapper } from '../../utilities'
import { PageElement } from '../dom'

const addDescription: (descriptionText: string) => void =
	(descriptionText: string): void => {
		const description: PageElement = documentWrapper.createElement('span')
		description.innerHTML = descriptionText

		// tslint:disable-next-line:no-unsafe-any
		state.dom.descriptionsContainer.appendChild(description)
	}

export default addDescription
