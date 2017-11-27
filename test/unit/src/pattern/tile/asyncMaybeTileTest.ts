import {
	Address,
	asyncMaybeTile,
	documentWrapper,
	maybeTile,
	NullarySideEffector,
	PageElement,
	state,
	to,
	windowWrapper,
} from '../../../../../src'
import Spy = jasmine.Spy
import { buildMockElement } from '../../../helpers'

describe('async maybe tile', () => {
	let setTimeoutSpy: Spy
	const gridAddress: Address = to.Address([ 4, 5 ])
	beforeEach(() => {
		state.patternRef = 99
		// tslint:disable-next-line:no-unsafe-any
		setTimeoutSpy = spyOn(windowWrapper, 'setTimeout').and.callFake((fn: NullarySideEffector) => {
			fn()
		})
		spyOn(maybeTile, 'default')
	})

	it('unblocks the thread by scheduling the tile for the next event loop', () => {
		asyncMaybeTile.default({ gridAddress, thisPatternRef: 99 })

		expect(setTimeoutSpy.calls.all()[ 0 ].args[ 1 ]).toBe(0)
	})

	describe('when the pattern the tile was born from has not been canceled', () => {
		it('calls maybe tile with the same arguments', () => {
			asyncMaybeTile.default({ gridAddress, thisPatternRef: 99 })

			expect(maybeTile.default).toHaveBeenCalledWith({ gridAddress, thisPatternRef: 99 })
		})

		it('updates the progress bar', () => {
			const progressBar: PageElement = buildMockElement()
			spyOn(documentWrapper, 'querySelector').and.returnValue(progressBar)
			state.tileCount = 200000
			state.tilesCompleted = 180001

			asyncMaybeTile.default({ gridAddress, thisPatternRef: 99 })

			expect(progressBar.style.width).toBe('91%')
		})
	})

	describe('when the pattern the tile was born from has been canceled', () => {
		it('does not call maybe tile', () => {
			asyncMaybeTile.default({ gridAddress, thisPatternRef: 98 })

			expect(maybeTile.default).not.toHaveBeenCalled()
		})

		it('does not update the progress bar', () => {
			const progressBar: PageElement = buildMockElement()
			progressBar.style.width = '10%'
			spyOn(documentWrapper, 'querySelector').and.returnValue(progressBar)
			state.tileCount = 200000
			state.tilesCompleted = 180001

			asyncMaybeTile.default({ gridAddress, thisPatternRef: 98 })

			expect(progressBar.style.width).toBe('10%')
		})
	})
})
