import { applyBackgroundColor, applyOpacity, applyViewForGrid } from '../../../../../src'

describe('apply view for grid', () => {
	it('applies background color', async (done: DoneFn) => {
		spyOn(applyBackgroundColor, 'main')

		applyViewForGrid.main()

		expect(applyBackgroundColor.main).toHaveBeenCalled()

		done()
	})

	it('applies opacity', async (done: DoneFn) => {
		spyOn(applyOpacity, 'main')

		applyViewForGrid.main()

		expect(applyOpacity.main).toHaveBeenCalled()

		done()
	})
})
