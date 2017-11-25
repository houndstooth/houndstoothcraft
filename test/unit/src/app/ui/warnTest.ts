import { documentWrapper, PageElement, warn } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('warn', () => {
	let children: PageElement[]
	let warningsContainer: PageElement
	beforeEach(() => {
		children = []
		warningsContainer = buildMockElement({ children })
		spyOn(documentWrapper, 'createElement').and.callFake(() => ({}))
	})

	it('adds warnings to the warnings container', () => {
		spyOn(documentWrapper, 'querySelector').and.returnValue(warningsContainer)

		warn.main('watch out!')
		warn.main('my man!')

		expect(children[ 0 ].innerHTML).toEqual('watch out!')
		expect(children[ 1 ].innerHTML).toEqual('my man!')
	})
})
