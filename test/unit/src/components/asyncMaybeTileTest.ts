import { asyncMaybeTile } from '../../../../src/components/asyncMaybeTile'
import * as maybeTile from '../../../../src/components/maybeTile'
import { Address } from '../../../../src/components/types'
import { PageElement } from '../../../../src/page/types'
import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'
import { NullarySideEffector } from '../../../../src/utilities/types'
import { document, windowWrapper } from '../../../../src/utilities/windowWrapper'
import Spy = jasmine.Spy
import { buildMockElement } from '../../helpers/buildMockElement'

describe('async maybe tile', () => {
	let setTimeoutSpy: Spy
	const gridAddress: Address = to.Address([ 4, 5 ])
	beforeEach(() => {
		// tslint:disable-next-line:no-unsafe-any
		setTimeoutSpy = spyOn(windowWrapper, 'setTimeout').and.callFake((fn: NullarySideEffector) => {
			fn()
		})
		spyOn(maybeTile, 'maybeTile')
	})

	it('unblocks the thread by scheduling the tile for the next event loop', () => {
		asyncMaybeTile({ gridAddress })

		expect(setTimeoutSpy.calls.all()[ 0 ].args[ 1 ]).toBe(0)
	})

	it('calls maybe tile with the same arguments', () => {
		asyncMaybeTile({ gridAddress })

		expect(maybeTile.maybeTile).toHaveBeenCalledWith({ gridAddress })
	})

	it('updates the progress bar', () => {
		state.tileCount = 200000
		state.tilesCompleted = 180001

		const progressBar: PageElement = buildMockElement()
		spyOn(document, 'querySelector').and.returnValue(progressBar)

		asyncMaybeTile({ gridAddress })

		expect(progressBar.style.height).toBe('9%')
	})
})
