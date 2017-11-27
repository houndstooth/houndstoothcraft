import { applyBackgroundColor, applyOpacity, applyViewForGrid } from '../../../../../src'

describe('apply view for grid', () => {
	it('applies background color', async (done: DoneFn) => {
		spyOn(applyBackgroundColor, 'default')

		applyViewForGrid.default()

		expect(applyBackgroundColor.default).toHaveBeenCalled()

		done()
	})

	it('applies opacity', async (done: DoneFn) => {
		spyOn(applyOpacity, 'default')

		applyViewForGrid.default()

		expect(applyOpacity.default).toHaveBeenCalled()

		done()
	})
})
