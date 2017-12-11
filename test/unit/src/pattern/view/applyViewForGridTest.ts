import {
	applyBackgroundColor,
	applyOpacity,
	applyViewForGrid,
	NullarySideEffector,
} from '../../../../../src/indexForTest'

const subject: NullarySideEffector = applyViewForGrid.default

describe('apply view for grid', () => {
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
