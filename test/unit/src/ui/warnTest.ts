import * as page from '../../../../src/page'
import { warn } from '../../../../src/ui/warn'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('warn', () => {
	let children: page.PageElement[]
	let warningsContainer: page.PageElement
	beforeEach(() => {
		children = []
		warningsContainer = buildMockElement({ children })
		spyOn(window.document, 'createElement').and.callFake(() => ({}))
	})

	it('adds warnings to the warnings container', () => {
		spyOn(window.document, 'querySelector').and.returnValue(warningsContainer)

		warn('watch out!')
		warn('my man!')

		expect(children[ 0 ].innerHTML).toEqual('watch out!')
		expect(children[ 1 ].innerHTML).toEqual('my man!')
	})

	it('creates the warnings container if it does not already exist', () => {
		spyOn(window.document, 'querySelector').and.returnValue(undefined)
		spyOn(page, 'createWarningsContainer').and.returnValue(warningsContainer)

		warn('lookin\' good!')

		expect(page.createWarningsContainer).toHaveBeenCalled()
	})
})
