import * as applyBackgroundColor from '../../../../../src/pattern/view/applyBackgroundColor'
import * as applyOpacity from '../../../../../src/pattern/view/applyOpacity'
import { applyViewForGrid } from '../../../../../src/pattern/view/applyViewForGrid'

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
