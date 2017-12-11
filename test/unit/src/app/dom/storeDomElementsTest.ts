import { appState, globalWrapper, NullarySideEffector, storeDomElements } from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'

const subject: NullarySideEffector = storeDomElements.default

describe('store dom elements', () => {
	it('puts references to important components on the page onto the app state', () => {
		const descriptionsContainer: HTMLElement = buildMockElement() as HTMLElement
		const frameInput: HTMLInputElement = buildMockElement() as HTMLInputElement
		const layersProgressBar: HTMLElement = buildMockElement() as HTMLElement
		const pauseButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const playButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const progressBar: HTMLElement = buildMockElement() as HTMLElement
		const progressMessage: HTMLElement = buildMockElement() as HTMLElement
		const rewindButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const snapshotButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement

		spyOn(globalWrapper.document, 'querySelector').and.callFake((selector: string): HTMLElement => {
			switch (selector) {
				case '#descriptions-container':
					return descriptionsContainer
				case '#frame-input':
					return frameInput
				case '#layers-progress-bar':
					return layersProgressBar
				case '#pause-button':
					return pauseButton
				case '#play-button':
					return playButton
				case '#progress-bar':
					return progressBar
				case '#progress-message':
					return progressMessage
				case '#rewind-button':
					return rewindButton
				case '#snapshot-button':
					return snapshotButton
				default:
					return buildMockElement() as HTMLElement
			}
		})

		subject()

		expect(appState.dom.descriptionsContainer).toBe(descriptionsContainer)
		expect(appState.dom.frameInput).toBe(frameInput)
		expect(appState.dom.layersProgressBar).toBe(layersProgressBar)
		expect(appState.dom.pauseButton).toBe(pauseButton)
		expect(appState.dom.playButton).toBe(playButton)
		expect(appState.dom.progressBar).toBe(progressBar)
		expect(appState.dom.progressMessage).toBe(progressMessage)
		expect(appState.dom.rewindButton).toBe(rewindButton)
		expect(appState.dom.snapshotButton).toBe(snapshotButton)
	})
})
