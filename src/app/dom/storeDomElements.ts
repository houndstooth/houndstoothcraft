// tslint:disable:no-unsafe-any

import { NullarySideEffector } from '../../utilities'
import { state } from '../state'
import { InputElement, PageElement } from './types'
import { documentWrapper } from './windowWrapper'

const storeDomElements: NullarySideEffector =
	(): void => {
		state.dom.descriptionsContainer = documentWrapper.querySelector('#descriptions-container') as PageElement
		state.dom.frameInput = documentWrapper.querySelector('#frame-input') as InputElement
		state.dom.layersProgressBar = documentWrapper.querySelector('#layers-progress-bar') as PageElement
		state.dom.pauseButton = documentWrapper.querySelector('#pause-button') as HTMLButtonElement
		state.dom.playButton = documentWrapper.querySelector('#play-button') as HTMLButtonElement
		state.dom.progressBar = documentWrapper.querySelector('#progress-bar') as PageElement
		state.dom.progressMessage = documentWrapper.querySelector('#progress-message') as PageElement
		state.dom.rewindButton = documentWrapper.querySelector('#rewind-button') as HTMLButtonElement
		state.dom.snapshotButton = documentWrapper.querySelector('#snapshot-button') as HTMLButtonElement
	}

export default storeDomElements
