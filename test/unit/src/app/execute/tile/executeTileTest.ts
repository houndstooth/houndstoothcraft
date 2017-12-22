import {
	Address,
	appState,
	executeTile,
	ExecuteTileParams,
	globalWrapper,
	thisPatternHasNotBeenCanceled,
	tile,
	to,
	updateProgress,
} from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('execute tile', () => {
	let subject: (_: ExecuteTileParams) => void
	let setTimeoutSpy: Spy
	let thisPatternHasNotBeenCanceledSpy: Spy
	let address: Address
	const patternId: number = 99
	beforeEach(() => {
		subject = executeTile.default
		address = to.Address([ 4, 5 ])
		// tslint:disable-next-line:no-unsafe-any
		setTimeoutSpy = spyOn(globalWrapper.window, 'setTimeout').and.callFake((fn: () => void) => {
			fn()
		})
		spyOn(tile, 'default')
		spyOn(updateProgress, 'default')
		spyOn(appState.execute, 'resolveGrid')
		thisPatternHasNotBeenCanceledSpy = spyOn(thisPatternHasNotBeenCanceled, 'default')
	})

	it('unblocks the thread by scheduling the tile for the next event loop', () => {
		subject({ address, patternId })

		expect(setTimeoutSpy.calls.all()[ 0 ].args[ 1 ]).toBe(0)
	})

	it('checks that the pattern has not been cancelled', () => {
		subject({ address, patternId })

		expect(thisPatternHasNotBeenCanceledSpy).toHaveBeenCalledWith(99)
	})

	describe('when the pattern the tile was born from has not been canceled', () => {
		beforeEach(() => {
			thisPatternHasNotBeenCanceledSpy.and.returnValue(true)

			subject({ address, patternId })
		})

		it('renders a tile', () => {
			expect(tile.default).toHaveBeenCalledWith({ address })
		})

		it('updates progress', () => {
			expect(updateProgress.default).toHaveBeenCalled()
		})

		it('increments the count of tiles completed', () => {
			appState.execute.tilesCompleted = 98

			subject({ address, patternId })

			expect(appState.execute.tilesCompleted).toBe(99)
		})

		describe('resolving grid', () => {
			describe('when the tiles completed are less than the total tiles', () => {
				it('does nothing', () => {
					appState.execute.tilesCompleted = 199340
					appState.execute.tileCount = 200000

					subject({ address, patternId })

					expect(appState.execute.resolveGrid).not.toHaveBeenCalled()
				})
			})

			describe('when the tiles completed are equal to the total tiles', () => {
				beforeEach(() => {
					appState.execute.tilesCompleted = 199999
					appState.execute.tileCount = 200000

					subject({ address, patternId })
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
		})
	})

	describe('when the pattern the tile was born from has been canceled', () => {
		beforeEach(() => {
			thisPatternHasNotBeenCanceledSpy.and.returnValue(false)

			subject({ address, patternId })
		})

		it('does not call maybe tile', () => {
			expect(tile.default).not.toHaveBeenCalled()
		})

		it('does not update progress', () => {
			expect(updateProgress.default).not.toHaveBeenCalled()
		})
	})
})
