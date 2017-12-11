import {
	Address,
	asyncMaybeTile,
	globalWrapper,
	maybeTile,
	NullarySideEffector,
	ReferencedGridAddress,
	thisPatternHasNotBeenCanceled,
	to,
	updateProgress,
} from '../../../../../src/indexForTest'
import Spy = jasmine.Spy

const subject: (_: ReferencedGridAddress) => void = asyncMaybeTile.default

describe('async maybe tile', () => {
	let setTimeoutSpy: Spy
	let thisPatternHasNotBeenCanceledSpy: Spy
	const gridAddress: Address = to.Address([ 4, 5 ])
	const thisPatternRef: number = 99
	beforeEach(() => {
		// tslint:disable-next-line:no-unsafe-any
		setTimeoutSpy = spyOn(globalWrapper.window, 'setTimeout').and.callFake((fn: NullarySideEffector) => {
			fn()
		})
		spyOn(maybeTile, 'default')
		spyOn(updateProgress, 'default')
		thisPatternHasNotBeenCanceledSpy = spyOn(thisPatternHasNotBeenCanceled, 'default')
	})

	it('unblocks the thread by scheduling the tile for the next event loop', () => {
		subject({ gridAddress, thisPatternRef })

		expect(setTimeoutSpy.calls.all()[ 0 ].args[ 1 ]).toBe(0)
	})

	it('checks that the pattern has not been cancelled', () => {
		subject({ gridAddress, thisPatternRef })

		expect(thisPatternHasNotBeenCanceledSpy).toHaveBeenCalledWith(99)
	})

	describe('when the pattern the tile was born from has not been canceled', () => {
		beforeEach(() => {
			thisPatternHasNotBeenCanceledSpy.and.returnValue(true)

			subject({ gridAddress, thisPatternRef })
		})

		it('calls maybe tile with the same arguments', () => {
			expect(maybeTile.default).toHaveBeenCalledWith({ gridAddress, thisPatternRef })
		})

		it('updates progress', () => {
			expect(updateProgress.default).toHaveBeenCalled()
		})
	})

	describe('when the pattern the tile was born from has been canceled', () => {
		beforeEach(() => {
			thisPatternHasNotBeenCanceledSpy.and.returnValue(false)

			subject({ gridAddress, thisPatternRef })
		})

		it('does not call maybe tile', () => {
			expect(maybeTile.default).not.toHaveBeenCalled()
		})

		it('does not update progress', () => {
			expect(updateProgress.default).not.toHaveBeenCalled()
		})
	})
})
