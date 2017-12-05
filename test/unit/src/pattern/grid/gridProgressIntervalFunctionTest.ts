import {
	clearInterval,
	gridProgressIntervalFunction,
	NullarySideEffector,
	state,
	windowWrapper,
} from '../../../../../src'

const subject: NullarySideEffector = gridProgressIntervalFunction.default

describe('grid progress interval function', () => {
	beforeEach(() => {
		spyOn(clearInterval, 'default')
		spyOn(state.execute, 'resolveGrid')
		state.execute.tileCount = 99
	})

	describe('when the grid is complete', () => {
		beforeEach(() => {
			state.execute.tilesCompleted = 99
		})

		it('resolves the promise', () => {
			subject()

			expect(state.execute.resolveGrid).toHaveBeenCalled()
		})

		it('clears the progress interval off the settings', () => {
			spyOn(windowWrapper, 'clearInterval')

			subject()

			expect(clearInterval.default).toHaveBeenCalledWith('gridProgressInterval')
		})

		it('resets the progress bar', () => {
			state.dom.progressBar.style.width = '99%'

			subject()

			expect(state.dom.progressBar.style.width).toBe('0%')
		})

		it('resets the progress message', () => {
			state.dom.progressMessage.textContent = 'Rendering frame 777: 99%'

			subject()

			expect(state.dom.progressMessage.textContent).toBe('')
		})
	})

	describe('when the grid is not yet complete', () => {
		beforeEach(() => {
			state.execute.tilesCompleted = 13
		})

		it('does not resolve the promise', () => {
			subject()

			expect(state.execute.resolveGrid).not.toHaveBeenCalled()
		})

		it('does not clear the progress interval off the settings', () => {
			spyOn(windowWrapper, 'clearInterval')

			subject()

			expect(clearInterval.default).not.toHaveBeenCalled()
		})

		it('does not reset the progress bar', () => {
			state.dom.progressBar.style.width = '99%'

			subject()

			expect(state.dom.progressBar.style.width).toBe('99%')
		})

		it('does not reset the progress message', () => {
			state.dom.progressMessage.textContent = 'Rendering frame 777: 99%'

			subject()

			expect(state.dom.progressMessage.textContent).toBe('Rendering frame 777: 99%')
		})
	})
})
