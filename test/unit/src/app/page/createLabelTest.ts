import {
	createCheckbox,
	createLabel,
	documentWrapper,
	Effect,
	InputElement,
	LabelElement,
	PageElement,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('create label', () => {
	let returnedLabel: LabelElement
	let label: PageElement
	const children: LabelElement[] = []
	const checkbox: InputElement = buildMockElement()
	const name: PageElement = buildMockElement()
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	beforeAll(() => {
		label = buildMockElement({ children })
		spyOn(documentWrapper, 'createElement').and.returnValue(label)

		spyOn(documentWrapper, 'createTextNode').and.returnValue(name)

		spyOn(createCheckbox, 'default').and.returnValue(checkbox)

		returnedLabel = createLabel.default({ houndstoothEffect })
	})

	it('returns the created label', () => {
		expect(returnedLabel).toBe(label)
	})

	it('adds one checkbox to the label', () => {
		expect(children[ 0 ]).toBe(checkbox as PageElement)
	})

	it('adds one name to the label, after the checkbox', () => {
		expect(children[ 1 ]).toBe(name)
	})

	it('makes the checkbox using the houndstooth effect', () => {
		expect(createCheckbox.default).toHaveBeenCalledWith({ houndstoothEffect })
	})

	it('makes the name using the houndstooth effect\'s name', () => {
		// tslint:disable-next-line:no-unsafe-any
		expect(documentWrapper.createTextNode).toHaveBeenCalledWith('mock tooth')
	})
})
