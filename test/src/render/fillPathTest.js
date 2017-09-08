import mockContext from '../helpers/mockContext'
import fillPath from '../../../src/render/fillPath'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder = []
		const context = mockContext(contextCallsOrder)

		fillPath({ context })

		expect(contextCallsOrder).toEqual([
			{ method: 'closePath' },
			{ method: 'fill' },
		])
	})
})
