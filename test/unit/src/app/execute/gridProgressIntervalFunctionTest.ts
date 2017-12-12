import {
	appState,
	clearIntervalAndRemoveFromState,
	gridProgressIntervalFunction,
	NullarySideEffector,
} from '../../../../../src/indexForTest'

describe('grid progress interval function', () => {
	let subject: NullarySideEffector
	beforeEach(() => {
		subject = gridProgressIntervalFunction.default
		spyOn(clearIntervalAndRemoveFromState, 'default')
		spyOn(appState.execute, 'resolveGrid')
		appState.execute.tileCount = 99
	})

	describe('when the grid is complete', () => {
		beforeEach(() => {
			appState.execute.tilesCompleted = 99
		})

		it('resolves the promise', () => {
			subject()

			expect(appState.execute.resolveGrid).toHaveBeenCalled()
		})

		it('clears the progress interval off the settings', () => {
			subject()

			expect(clearIntervalAndRemoveFromState.default).toHaveBeenCalledWith('gridProgressInterval')
		})

		it('resets the progress bar', () => {
			appState.dom.progressBar.style.width = '99%'

			subject()

			expect(appState.dom.progressBar.style.width).toBe('0%')
		})

		it('resets the progress message', () => {
			appState.dom.progressMessage.textContent = 'Rendering frame 777: 99%'

			subject()

			expect(appState.dom.progressMessage.textContent).toBe('')
		})
	})

	describe('when the grid is not yet complete', () => {
		beforeEach(() => {
			appState.execute.tilesCompleted = 13
		})

		it('does not resolve the promise', () => {
			subject()

			expect(appState.execute.resolveGrid).not.toHaveBeenCalled()
		})

		it('does not clear the progress interval off the settings', () => {
			subject()

			expect(clearIntervalAndRemoveFromState.default).not.toHaveBeenCalled()
		})

		it('does not reset the progress bar', () => {
			appState.dom.progressBar.style.width = '99%'

			subject()

			expect(appState.dom.progressBar.style.width).toBe('99%')
		})

		it('does not reset the progress message', () => {
			appState.dom.progressMessage.textContent = 'Rendering frame 777: 99%'

			subject()

			expect(appState.dom.progressMessage.textContent).toBe('Rendering frame 777: 99%')
		})
	})
})
