import {
	buildGridProgressIntervalFunction,
	clearInterval,
	NullarySideEffector,
	PageElement,
	state,
	windowWrapper,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('build progress interval function returns a function which', () => {
	let progressBar: PageElement
	let progressMessage: PageElement
	let gridProgressIntervalFunction: NullarySideEffector
	beforeEach(() => {
		spyOn(clearInterval, 'default')
		progressBar = buildMockElement()
		progressMessage = buildMockElement()
		gridProgressIntervalFunction = buildGridProgressIntervalFunction.default({ progressBar, progressMessage })
		spyOn(state, 'resolveGrid')
		state.tileCount = 99
	})

	describe('when the grid is complete', () => {
		beforeEach(() => {
			state.tilesCompleted = 99
		})

		it('resolves the promise', () => {
			gridProgressIntervalFunction()

			expect(state.resolveGrid).toHaveBeenCalled()
		})

		it('clears the progress interval off the settings', () => {
			spyOn(windowWrapper, 'clearInterval')

			gridProgressIntervalFunction()

			expect(clearInterval.default).toHaveBeenCalledWith('gridProgressInterval')
		})

		it('resets the progress bar', () => {
			progressBar.style.width = '99%'

			gridProgressIntervalFunction()

			expect(progressBar.style.width).toBe('0%')
		})

		it('resets the progress message', () => {
			progressMessage.textContent = 'Rendering frame 777: 99%'

			gridProgressIntervalFunction()

			expect(progressMessage.textContent).toBe('')
		})
	})

	describe('when the grid is not yet complete', () => {
		beforeEach(() => {
			state.tilesCompleted = 13
		})

		it('does not resolve the promise', () => {
			gridProgressIntervalFunction()

			expect(state.resolveGrid).not.toHaveBeenCalled()
		})

		it('does not clear the progress interval off the settings', () => {
			spyOn(windowWrapper, 'clearInterval')

			gridProgressIntervalFunction()

			expect(clearInterval.default).not.toHaveBeenCalled()
		})

		it('does not reset the progress bar', () => {
			progressBar.style.width = '99%'

			gridProgressIntervalFunction()

			expect(progressBar.style.width).toBe('99%')
		})

		it('does not reset the progress message', () => {
			progressMessage.textContent = 'Rendering frame 777: 99%'

			gridProgressIntervalFunction()

			expect(progressMessage.textContent).toBe('Rendering frame 777: 99%')
		})
	})

	it('does not fail when there is no progress bar', () => {
		state.tilesCompleted = 99
		gridProgressIntervalFunction = buildGridProgressIntervalFunction.default({ progressBar: undefined })

		gridProgressIntervalFunction()
	})
})
