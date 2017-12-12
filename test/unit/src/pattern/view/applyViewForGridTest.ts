import {
	applyBackgroundColor,
	applyOpacity,
	applyViewForGrid,
	NullarySideEffector,
} from '../../../../../src/indexForTest'

describe('apply view for grid', () => {
	let subject: NullarySideEffector
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
