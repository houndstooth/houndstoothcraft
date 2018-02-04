import { appState, resolveGrid } from '../../../../../../src/indexForTest'

describe('resolve grid', () => {
	let subject: () => void
	beforeEach(() => {
		subject = resolveGrid.default
		spyOn(appState.execute, 'resolveGrid')

		subject()
	})

	it('resolves the grid', () => {
		expect(appState.execute.resolveGrid).toHaveBeenCalled()
	})

	it('resets the progress bar', () => {
		expect(appState.dom.progressBar.style.width).toBe('0%')
	})

	it('resets the progress message', () => {
		expect(appState.dom.progressMessage.textContent).toBe('')
	})

	it('resets the tiles completed', () => {
		expect(appState.execute.tilesCompleted).toBe(0)
	})
})
