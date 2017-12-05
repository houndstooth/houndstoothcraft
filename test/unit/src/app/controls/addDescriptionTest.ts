import { addDescription, documentWrapper, PageElement, state } from '../../../../../src'
import { buildMockElement } from '../../../helpers'

const subject: (_: string) => void = addDescription.default

describe('add description', () => {
	it('adds descriptions to the descriptions container', () => {
		const children: PageElement[] = []

		spyOn(documentWrapper, 'createElement').and.callFake(buildMockElement)
		state.dom.descriptionsContainer = buildMockElement({ children })

		subject('is great')
		subject('is grand')

		expect(children[ 0 ].innerHTML).toEqual('is great')
		expect(children[ 1 ].innerHTML).toEqual('is grand')
	})
})
