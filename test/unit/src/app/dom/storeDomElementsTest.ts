// tslint:disable:no-object-literal-type-assertion

import { appState, globalWrapper, storeDomElements } from '../../../../../src/indexForTest'

describe('store dom elements', () => {
	it('puts references to important components on the page onto the app state', () => {
		const subject: () => void = storeDomElements.default
		const canvasContainer: HTMLElement = {} as HTMLElement
		const descriptionsContainer: HTMLElement = {} as HTMLElement
		const effectTogglesContainer: HTMLElement = {} as HTMLElement
		const frameInput: HTMLInputElement = {} as HTMLInputElement
		const overrideContainer: HTMLElement = {} as HTMLElement
		const layersProgressBar: HTMLElement = {} as HTMLElement
		const pauseButton: HTMLButtonElement = {} as HTMLButtonElement
		const playButton: HTMLButtonElement = {} as HTMLButtonElement
		const progressBar: HTMLElement = {} as HTMLElement
		const progressMessage: HTMLElement = {} as HTMLElement
		const rewindButton: HTMLButtonElement = {} as HTMLButtonElement
		const snapshotButton: HTMLButtonElement = {} as HTMLButtonElement

		spyOn(globalWrapper.document, 'querySelector').and.callFake((selector: string): HTMLElement => {
			switch (selector) {
				case '#canvas-container':
					return canvasContainer
				case '#descriptions-container':
					return descriptionsContainer
				case '#effect-toggles-container':
					return effectTogglesContainer
				case '#frame-input':
					return frameInput
				case '#override-container':
					return overrideContainer
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
					return {} as HTMLElement
			}
		})

		subject()

		expect(appState.dom.canvasContainer).toBe(canvasContainer)
		expect(appState.dom.descriptionsContainer).toBe(descriptionsContainer)
		expect(appState.dom.effectTogglesContainer).toBe(effectTogglesContainer)
		expect(appState.dom.frameInput).toBe(frameInput)
		expect(appState.dom.overrideContainer).toBe(overrideContainer)
		expect(appState.dom.layersProgressBar).toBe(layersProgressBar)
		expect(appState.dom.pauseButton).toBe(pauseButton)
		expect(appState.dom.playButton).toBe(playButton)
		expect(appState.dom.progressBar).toBe(progressBar)
		expect(appState.dom.progressMessage).toBe(progressMessage)
		expect(appState.dom.rewindButton).toBe(rewindButton)
		expect(appState.dom.snapshotButton).toBe(snapshotButton)
	})
})
