import warn from '../../../src/ui/warn'
import * as window from '../../../src/utilities/windowWrapper'
import buildMockElement from '../helpers/buildMockElement'

describe('warn', () => {
	it('adds warnings to the warnings container', () => {
		spyOn(window.document, 'createElement').and.callFake(() => ({}))

		const mockChildren = []
		const mockWarningsContainer = buildMockElement({ mockChildren })
		spyOn(window.document, 'querySelector').and.returnValue(mockWarningsContainer)


		warn('watch out!')
		warn('my man!')


		expect(mockChildren[0].innerHTML).toEqual('watch out!')
		expect(mockChildren[1].innerHTML).toEqual('my man!')
	})
})
