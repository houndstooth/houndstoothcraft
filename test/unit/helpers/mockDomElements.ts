import { buildMockElement } from '../'
import { appState } from '../../../src'

const mockDomElements = () => {
	appState.dom.descriptionsContainer = buildMockElement() as HTMLElement
	appState.dom.frameInput = buildMockElement() as HTMLInputElement
	appState.dom.layersProgressBar = buildMockElement() as HTMLElement
	appState.dom.pauseButton = buildMockElement() as HTMLButtonElement
	appState.dom.playButton = buildMockElement() as HTMLButtonElement
	appState.dom.progressBar = buildMockElement() as HTMLElement
	appState.dom.progressMessage = buildMockElement() as HTMLElement
	appState.dom.rewindButton = buildMockElement() as HTMLButtonElement
	appState.dom.snapshotButton = buildMockElement() as HTMLButtonElement
}

export default mockDomElements
