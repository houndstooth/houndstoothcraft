import { PageElement } from '../../../../../src/app/page/types'
import { Address } from '../../../../../src/pattern/grid/types'
import { asyncMaybeTile } from '../../../../../src/pattern/tile/asyncMaybeTile'
import * as maybeTile from '../../../../../src/pattern/tile/maybeTile'
import { state } from '../../../../../src/state'
import * as to from '../../../../../src/to'
import { NullarySideEffector } from '../../../../../src/utilities/types'
import { documentWrapper, windowWrapper } from '../../../../../src/utilities/windowWrapper'
import Spy = jasmine.Spy
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('async maybe tile', () => {
	let setTimeoutSpy: Spy
	const gridAddress: Address = to.Address([ 4, 5 ])
	beforeEach(() => {
		state.patternRef = 99
		// tslint:disable-next-line:no-unsafe-any
		setTimeoutSpy = spyOn(windowWrapper, 'setTimeout').and.callFake((fn: NullarySideEffector) => {
			fn()
		})
		spyOn(maybeTile, 'maybeTile')
	})

	it('unblocks the thread by scheduling the tile for the next event loop', () => {
		asyncMaybeTile({ gridAddress, thisPatternRef: 99 })

		expect(setTimeoutSpy.calls.all()[ 0 ].args[ 1 ]).toBe(0)
	})

	describe('when the pattern the tile was born from has not been canceled', () => {
		it('calls maybe tile with the same arguments', () => {
			asyncMaybeTile({ gridAddress, thisPatternRef: 99 })

			expect(maybeTile.maybeTile).toHaveBeenCalledWith({ gridAddress, thisPatternRef: 99 })
		})

		it('updates the progress bar', () => {
			const progressBar: PageElement = buildMockElement()
			spyOn(documentWrapper, 'querySelector').and.returnValue(progressBar)
			state.tileCount = 200000
			state.tilesCompleted = 180001

			asyncMaybeTile({ gridAddress, thisPatternRef: 99 })

			expect(progressBar.style.height).toBe('9%')
		})
	})

	describe('when the pattern the tile was born from has been canceled', () => {
		it('does not call maybe tile', () => {
			asyncMaybeTile({ gridAddress, thisPatternRef: 98 })

			expect(maybeTile.maybeTile).not.toHaveBeenCalled()
		})

		it('does not update the progress bar', () => {
			const progressBar: PageElement = buildMockElement()
			progressBar.style.height = '10%'
			spyOn(documentWrapper, 'querySelector').and.returnValue(progressBar)
			state.tileCount = 200000
			state.tilesCompleted = 180001

			asyncMaybeTile({ gridAddress, thisPatternRef: 98 })

			expect(progressBar.style.height).toBe('10%')
		})
	})
})
