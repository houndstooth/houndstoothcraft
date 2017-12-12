import { appState, createDescription, globalWrapper } from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'

describe('create description', () => {
	let subject: (_: string) => void
	beforeEach(() => {
		subject = createDescription.default
	})

	it('creates a new description in the descriptions container', () => {
		const children: HTMLElement[] = []

		spyOn(globalWrapper.document, 'createElement').and.callFake(buildMockElement)
		appState.dom.descriptionsContainer = buildMockElement({ children }) as HTMLElement

		subject('is great')
		subject('is grand')

		expect(children[ 0 ].innerHTML).toEqual('is great')
		expect(children[ 1 ].innerHTML).toEqual('is grand')
	})
})
