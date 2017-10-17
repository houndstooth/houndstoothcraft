import fillPath from '../../../../src/render/fillPath'
import buildMockContext from '../../../helpers/buildMockContext'

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
