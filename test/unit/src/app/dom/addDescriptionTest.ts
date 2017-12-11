import { addDescription, appState, globalWrapper } from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'

const subject: (_: string) => void = addDescription.default

describe('add description', () => {
	it('adds descriptions to the descriptions container', () => {
		const children: HTMLElement[] = []

		spyOn(globalWrapper.document, 'createElement').and.callFake(buildMockElement)
		appState.dom.descriptionsContainer = buildMockElement({ children }) as HTMLElement

		subject('is great')
		subject('is grand')

		expect(children[ 0 ].innerHTML).toEqual('is great')
		expect(children[ 1 ].innerHTML).toEqual('is grand')
	})
})
