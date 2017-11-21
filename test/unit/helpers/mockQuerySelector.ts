import { PageElement } from '../../../src/app/page/types'
import { documentWrapper } from '../../../src/utilities'
import { buildMockElement } from './buildMockElement'

const mockQuerySelector: () => { [_: string]: PageElement } =
	(): { [_: string]: PageElement } => {
		const pauseButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const playButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const rewindButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
		const snapshotButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement

		spyOn(documentWrapper, 'querySelector').and.callFake((selector: string): PageElement => {
			switch (selector) {
				case '#pause-button':
					return pauseButton
				case '#play-button':
					return playButton
				case '#rewind-button':
					return rewindButton
				case '#snapshot-button':
					return snapshotButton
				default:
					return buildMockElement()
			}
		})

		return {
			pauseButton,
			playButton,
			rewindButton,
			snapshotButton,
		}
	}

export { mockQuerySelector }
