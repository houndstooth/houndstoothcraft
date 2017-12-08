import { globalWrapper } from '../../utilities'
import { appState } from '../appState'

const addDescription: (_: string) => void =
	(descriptionText: string): void => {
		const description: HTMLElement = globalWrapper.document.createElement('span')
		description.innerHTML = descriptionText

		// tslint:disable-next-line:no-unsafe-any
		appState.dom.descriptionsContainer.appendChild(description)
	}

export default addDescription
