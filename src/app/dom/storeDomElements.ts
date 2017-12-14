// tslint:disable:no-unsafe-any

import { globalWrapper } from '../../utilities'
import { appState } from '../appState'

const storeDomElements: () => void =
	(): void => {
		appState.dom.canvasContainer = globalWrapper.document.querySelector('#canvas-container') as HTMLElement
		appState.dom.descriptionsContainer = globalWrapper.document.querySelector('#descriptions-container') as HTMLElement
		appState.dom.effectTogglesContainer = globalWrapper.document.querySelector('#effect-toggles-container') as HTMLElement
		appState.dom.frameInput = globalWrapper.document.querySelector('#frame-input') as HTMLInputElement
		appState.dom.houndstoothControls = globalWrapper.document.querySelector('#houndstooth-controls') as HTMLCanvasElement
		appState.dom.layersProgressBar = globalWrapper.document.querySelector('#layers-progress-bar') as HTMLElement
		appState.dom.mixedDownCanvas = globalWrapper.document.querySelector('#mixed-down-canvas') as HTMLCanvasElement
		appState.dom.pauseButton = globalWrapper.document.querySelector('#pause-button') as HTMLButtonElement
		appState.dom.playButton = globalWrapper.document.querySelector('#play-button') as HTMLButtonElement
		appState.dom.progressBar = globalWrapper.document.querySelector('#progress-bar') as HTMLElement
		appState.dom.progressMessage = globalWrapper.document.querySelector('#progress-message') as HTMLElement
		appState.dom.rewindButton = globalWrapper.document.querySelector('#rewind-button') as HTMLButtonElement
		appState.dom.snapshotButton = globalWrapper.document.querySelector('#snapshot-button') as HTMLButtonElement
	}

export default storeDomElements
