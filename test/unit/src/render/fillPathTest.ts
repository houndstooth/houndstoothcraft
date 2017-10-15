import buildMockContext from '../../../helpers/buildMockContext'
import fillPath from '../../../../src/render/fillPath'

describe('fill path', () => {
	it('closes the path and fills it', () => {
		const contextCallsOrder = [] as any
		const context = buildMockContext({ contextCallsOrder })

		fillPath({ context })

		expect(contextCallsOrder).toEqual([
			{ method: 'closePath' },
			{ method: 'fill' },
		])
	})
})
