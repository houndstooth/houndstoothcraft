// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { InputElement, PageElement } from './types'
import { documentWrapper } from './windowWrapper'

const storeDomElements: NullarySideEffector =
	(): void => {
		appState.dom.descriptionsContainer = documentWrapper.querySelector('#descriptions-container') as PageElement
		appState.dom.frameInput = documentWrapper.querySelector('#frame-input') as InputElement
		appState.dom.layersProgressBar = documentWrapper.querySelector('#layers-progress-bar') as PageElement
		appState.dom.pauseButton = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		appState.dom.playButton = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		appState.dom.progressBar = documentWrapper.querySelector('#progress-bar') as PageElement
		appState.dom.progressMessage = documentWrapper.querySelector('#progress-message') as PageElement
		appState.dom.rewindButton = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		appState.dom.snapshotButton = documentWrapper.querySelector('#snapshot-button') as HTMLButtonElement
	}

export default storeDomElements
