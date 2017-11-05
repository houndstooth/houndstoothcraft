import { PageElement } from '../../../src/page/types'
import { document } from '../../../src/utilities/windowWrapper'
import { buildMockElement } from './buildMockElement'

const mockQuerySelector: () => { [_: string]: PageElement } =
	(): { [_: string]: PageElement } => {
		const pauseButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const playButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const rewindButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement

		spyOn(document, 'querySelector').and.callFake((selector: string): PageElement => {
			switch (selector) {
				case '#pause-button':
					return pauseButton
				case '#play-button':
					return playButton
				case '#rewind-button':
					return rewindButton
				default:
					return buildMockElement()
			}
		})

		return {
			pauseButton,
			playButton,
			rewindButton,
		}
	}

export { mockQuerySelector }
