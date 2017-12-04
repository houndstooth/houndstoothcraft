import { addDescription, documentWrapper, PageElement } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

const subject: (_: string) => void = addDescription.default

describe('add description', () => {
	let children: PageElement[]
	let descriptionsContainer: PageElement
	beforeEach(() => {
		children = []
		descriptionsContainer = buildMockElement({ children })
		spyOn(documentWrapper, 'createElement').and.callFake(() => ({}))
	})

	it('adds descriptions to the descriptions container', () => {
		spyOn(documentWrapper, 'querySelector').and.returnValue(descriptionsContainer)

		subject('is great')
		subject('is grand')

		expect(children[ 0 ].innerHTML).toEqual('is great')
		expect(children[ 1 ].innerHTML).toEqual('is grand')
	})
})
