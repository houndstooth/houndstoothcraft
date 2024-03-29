import { appState, createDescription, globalWrapper } from '../../../../../../src/indexForTest'
import { createMockElement } from '../../../../helpers'

describe('create description', () => {
	let subject: (_: string) => void
	beforeEach(() => {
		subject = createDescription.default
	})

	it('creates a new description in the descriptions container', () => {
		const children: HTMLElement[] = []

		// @ts-ignore
		spyOn(globalWrapper.document, 'createElement').and.callFake(createMockElement)
		appState.dom.descriptionsContainer = createMockElement({ children }) as HTMLElement

		subject('is great')
		subject('is grand')

		expect(children[ 0 ].innerHTML).toEqual('is great')
		expect(children[ 1 ].innerHTML).toEqual('is grand')
	})
})
