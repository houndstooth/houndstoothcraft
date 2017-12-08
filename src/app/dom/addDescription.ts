import { appState } from '../appState'
import { documentWrapper } from './windowWrapper'

const addDescription: (_: string) => void =
	(descriptionText: string): void => {
		const description: HTMLElement = documentWrapper.createElement('span')
		description.innerHTML = descriptionText

		// tslint:disable-next-line:no-unsafe-any
		appState.dom.descriptionsContainer.appendChild(description)
	}

export default addDescription
