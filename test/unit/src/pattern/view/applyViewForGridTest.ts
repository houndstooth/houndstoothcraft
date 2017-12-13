import { applyBackgroundColor, applyOpacity, applyViewForGrid } from '../../../../../src/indexForTest'

describe('apply view for grid', () => {
	let subject: () => void
	beforeEach(() => {
		subject = applyViewForGrid.default
	})

	it('applies background color', () => {
		spyOn(applyBackgroundColor, 'default')

		subject()

		expect(applyBackgroundColor.default).toHaveBeenCalled()
	})

	it('applies opacity', () => {
		spyOn(applyOpacity, 'default')

		subject()

		expect(applyOpacity.default).toHaveBeenCalled()
	})
})
