import { documentWrapper, NullarySideEffector, PageElement, state, storeDomElements } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

const subject: NullarySideEffector = storeDomElements.default

describe('store dom elements', () => {
	it('puts references to important components on the page onto the store', () => {
		const descriptionsContainer: HTMLElement = buildMockElement() as HTMLElement
		const frameInput: HTMLInputElement = buildMockElement() as HTMLInputElement
		const layersProgressBar: HTMLElement = buildMockElement() as HTMLElement
		const pauseButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const playButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const progressBar: HTMLElement = buildMockElement() as HTMLElement
		const progressMessage: HTMLElement = buildMockElement() as HTMLElement
		const rewindButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const snapshotButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement

		spyOn(documentWrapper, 'querySelector').and.callFake((selector: string): PageElement => {
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
					return buildMockElement()
			}
		})

		subject()

		expect(state.dom.descriptionsContainer).toBe(descriptionsContainer)
		expect(state.dom.frameInput).toBe(frameInput)
		expect(state.dom.layersProgressBar).toBe(layersProgressBar)
		expect(state.dom.pauseButton).toBe(pauseButton)
		expect(state.dom.playButton).toBe(playButton)
		expect(state.dom.progressBar).toBe(progressBar)
		expect(state.dom.progressMessage).toBe(progressMessage)
		expect(state.dom.rewindButton).toBe(rewindButton)
		expect(state.dom.snapshotButton).toBe(snapshotButton)
	})
})
