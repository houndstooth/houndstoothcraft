import * as page from '../../../../../src/app/page'
import { warn } from '../../../../../src/app/ui/warn'
import * as windowWrapper from '../../../../../src/utilities'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('warn', () => {
	let children: page.PageElement[]
	let warningsContainer: page.PageElement
	beforeEach(() => {
		children = []
		warningsContainer = buildMockElement({ children })
		spyOn(windowWrapper.documentWrapper, 'createElement').and.callFake(() => ({}))
	})

	it('adds warnings to the warnings container', () => {
		spyOn(windowWrapper.documentWrapper, 'querySelector').and.returnValue(warningsContainer)

		warn('watch out!')
		warn('my man!')

		expect(children[ 0 ].innerHTML).toEqual('watch out!')
		expect(children[ 1 ].innerHTML).toEqual('my man!')
	})
})
