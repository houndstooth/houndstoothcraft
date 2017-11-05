import { buildGridProgressIntervalFunction } from '../../../../src/execute/buildGridProgressIntervalFunction'
import { PageElement } from '../../../../src/page/types'
import { state } from '../../../../src/state'
import { NullarySideEffector } from '../../../../src/utilities/types'
import { windowWrapper } from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('build progress interval function returns a function which', () => {
	let progressBar: PageElement
	let gridProgressIntervalFunction: NullarySideEffector
	beforeEach(() => {
		progressBar = buildMockElement()
		gridProgressIntervalFunction = buildGridProgressIntervalFunction({ progressBar })
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

		it('clears the progress interval off the store', () => {
			spyOn(windowWrapper, 'clearInterval')

			gridProgressIntervalFunction()

			// tslint:disable-next-line:no-unsafe-any
			expect(windowWrapper.clearInterval).toHaveBeenCalledWith(state.gridProgressInterval)
		})

		it('resets the progress bar', () => {
			progressBar.style.height = '99%'

			gridProgressIntervalFunction()

			expect(progressBar.style.height).toBe('0%')
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

		it('does not clear the progress interval off the store', () => {
			spyOn(windowWrapper, 'clearInterval')

			gridProgressIntervalFunction()

			// tslint:disable-next-line:no-unsafe-any
			expect(windowWrapper.clearInterval).not.toHaveBeenCalled()
		})

		it('does not reset the progress bar', () => {
			progressBar.style.height = '99%'

			gridProgressIntervalFunction()

			expect(progressBar.style.height).toBe('99%')
		})
	})

	it('does not fail when there is no progress bar', () => {
		state.tilesCompleted = 99
		gridProgressIntervalFunction = buildGridProgressIntervalFunction({ progressBar: undefined })

		gridProgressIntervalFunction()
	})
})
