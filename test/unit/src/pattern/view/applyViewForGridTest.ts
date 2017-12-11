import { applyBackgroundColor, applyOpacity, applyViewForGrid, NullarySideEffector } from '../../../../../src/indexForTest'

const subject: NullarySideEffector = applyViewForGrid.default

describe('apply view for grid', () => {
	it('applies background color', async (done: DoneFn) => {
		spyOn(applyBackgroundColor, 'default')

		subject()

		expect(applyBackgroundColor.default).toHaveBeenCalled()

		done()
	})

	it('applies opacity', async (done: DoneFn) => {
		spyOn(applyOpacity, 'default')

		subject()

		expect(applyOpacity.default).toHaveBeenCalled()

		done()
	})
})
