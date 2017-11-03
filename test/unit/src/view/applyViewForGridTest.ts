import * as applyBackgroundColor from '../../../../src/view/applyBackgroundColor'
import * as applyOpacity from '../../../../src/view/applyOpacity'
import { applyViewForGrid } from '../../../../src/view/applyViewForGrid'

describe('apply view for grid', () => {
	it('applies background color', async (done: DoneFn) => {
		spyOn(applyBackgroundColor, 'applyBackgroundColor')

		applyViewForGrid()

		expect(applyBackgroundColor.applyBackgroundColor).toHaveBeenCalled()

		done()
	})

	it('applies opacity', async (done: DoneFn) => {
		spyOn(applyOpacity, 'applyOpacity')

		applyViewForGrid()

		expect(applyOpacity.applyOpacity).toHaveBeenCalled()

		done()
	})
})
