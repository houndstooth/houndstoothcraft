import {
	buildEffectToggleClickHandler,
	createCheckbox,
	documentWrapper,
	Effect,
	InputElement,
	noop,
	NullarySideEffector,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('create checkbox', () => {
	let returnedCheckbox: InputElement
	let checkbox: InputElement
	const classList: string[] = []
	const attributeObject: { type: string } = { type: '' }
	const clickHandler: NullarySideEffector = noop.default
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	beforeAll(() => {
		checkbox = buildMockElement({ classList, attributeObject }) as InputElement
		spyOn(documentWrapper, 'createElement').and.returnValue(checkbox)

		spyOn(buildEffectToggleClickHandler, 'default').and.returnValue(clickHandler)

		returnedCheckbox = createCheckbox.default({ houndstoothEffect })
	})

	it('returns the created label', () => {
		expect(returnedCheckbox).toBe(checkbox)
	})

	it('makes the checkbox using the houndstooth effect', () => {
		expect(buildEffectToggleClickHandler.default).toHaveBeenCalledWith({
			checkbox,
			houndstoothEffect,
		})
	})

	it('gives the checkbox a class which is the kebab-cased version of the houndstooth effect\'s name', () => {
		expect(classList[ 0 ]).toBe('mock-tooth')
	})

	it('assigns a click handler to the checkbox', () => {
		expect(returnedCheckbox.onclick).toBe(clickHandler)
	})

	it('sets the type to checkbox', () => {
		expect(attributeObject.type).toBe('checkbox')
	})
})
