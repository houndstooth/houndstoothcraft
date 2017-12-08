// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { documentWrapper } from './windowWrapper'

const storeDomElements: NullarySideEffector =
	(): void => {
		appState.dom.descriptionsContainer = documentWrapper.querySelector('#descriptions-container') as HTMLElement
		appState.dom.frameInput = documentWrapper.querySelector('#frame-input') as HTMLInputElement
		appState.dom.layersProgressBar = documentWrapper.querySelector('#layers-progress-bar') as HTMLElement
		appState.dom.pauseButton = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		appState.dom.playButton = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		appState.dom.progressBar = documentWrapper.querySelector('#progress-bar') as HTMLElement
		appState.dom.progressMessage = documentWrapper.querySelector('#progress-message') as HTMLElement
		appState.dom.rewindButton = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		appState.dom.snapshotButton = documentWrapper.querySelector('#snapshot-button') as HTMLButtonElement
	}

export default storeDomElements
