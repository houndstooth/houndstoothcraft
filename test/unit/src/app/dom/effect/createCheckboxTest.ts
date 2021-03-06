import {
	createCheckbox,
	effectToggleHandler,
	globalWrapper,
	NamedEffect,
} from '../../../../../../src/indexForTest'
import { createMockElement } from '../../../../helpers'

describe('create checkbox', () => {
	let subject: (_: { effect: NamedEffect }) => HTMLInputElement
	let returnedCheckbox: HTMLInputElement
	let checkbox: HTMLInputElement

	const attributeObject: { id: string, name: string, type: string } = { id: '', name: '', type: '' }
	const effect: NamedEffect = { name: 'mock tooth', description: '' }

	beforeEach(() => {
		subject = createCheckbox.default
		checkbox = createMockElement({ attributeObject }) as HTMLInputElement
		spyOn(globalWrapper.document, 'createElement').and.returnValue(checkbox)

		returnedCheckbox = subject({ effect })
	})

	it('returns the created label', () => {
		expect(returnedCheckbox).toBe(checkbox)
	})

	it('sets the id to a kebab-cased version of the effect\'s name', () => {
		expect(attributeObject.id).toBe('mock-tooth')
	})

	it('sets the name to a kebab-cased version of the effect\'s name', () => {
		expect(attributeObject.name).toBe('mock-tooth')
	})

	it('assigns a handler to the checkbox', () => {
		expect(returnedCheckbox.onclick).toBe(effectToggleHandler.default)
	})

	it('sets the type-attribute to checkbox', () => {
		expect(attributeObject.type).toBe('checkbox')
	})
})
