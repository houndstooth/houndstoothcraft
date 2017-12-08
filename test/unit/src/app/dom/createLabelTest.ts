import {
	createCheckbox,
	createLabel,
	documentWrapper,
	NamedEffect,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

const subject: (_: { effect: NamedEffect }) => HTMLLabelElement = createLabel.default

describe('create label', () => {
	let returnedLabel: HTMLLabelElement
	let label: HTMLLabelElement
	const children: HTMLElement[] = []
	const checkbox: HTMLInputElement = buildMockElement() as HTMLInputElement
	const name: HTMLElement = buildMockElement() as HTMLElement
	const effect: NamedEffect = { name: 'mock tooth', description: '' }
	const attributeObject: { 'for': string } = { for: '' }

	beforeEach(() => {
		label = buildMockElement({ children, attributeObject }) as HTMLLabelElement
		spyOn(documentWrapper, 'createElement').and.returnValue(label)

		spyOn(documentWrapper, 'createTextNode').and.returnValue(name)

		spyOn(createCheckbox, 'default').and.returnValue(checkbox)

		returnedLabel = subject({ effect }) as HTMLLabelElement
	})

	it('returns the created label', () => {
		expect(returnedLabel).toBe(label)
	})

	it('adds text of the effect\'s name to the label', () => {
		expect(children[ 0 ]).toBe(name)
	})

	it('associates the label with the checkbox', () => {
		expect(attributeObject.for).toBe('mock-tooth')
	})

	it('makes the name using the effect\'s name', () => {
		// tslint:disable-next-line:no-unsafe-any
		expect(documentWrapper.createTextNode).toHaveBeenCalledWith('mock tooth')
	})
})
