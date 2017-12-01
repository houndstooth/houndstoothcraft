import { documentWrapper, PageElement } from '../../../src'
import buildMockElement from './buildMockElement'

const mockQuerySelector: () => { [_: string]: PageElement } =
	(): { [_: string]: PageElement } => {
		const frameInput: HTMLInputElement = buildMockElement() as HTMLInputElement
		const pauseButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const playButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const progressBar: HTMLElement = buildMockElement() as HTMLElement
		const progressMessage: HTMLElement = buildMockElement() as HTMLElement
		const rewindButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const snapshotButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement

		spyOn(documentWrapper, 'querySelector').and.callFake((selector: string): PageElement => {
			switch (selector) {
				case '#frame-input':
					return frameInput
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

		return {
			frameInput,
			pauseButton,
			playButton,
			progressBar,
			progressMessage,
			rewindButton,
			snapshotButton,
		}
	}

export default mockQuerySelector
