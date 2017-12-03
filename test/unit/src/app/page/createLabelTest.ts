import {
	createCheckbox,
	createLabel,
	documentWrapper,
	InputElement,
	LabelElement,
	NamedEffect,
	PageElement,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'

describe('create label', () => {
	let returnedLabel: LabelElement
	let label: PageElement
	const children: LabelElement[] = []
	const checkbox: InputElement = buildMockElement()
	const name: PageElement = buildMockElement()
	const houndstoothEffect: NamedEffect = { name: 'mock tooth' }

	beforeEach(() => {
		label = buildMockElement({ children })
		spyOn(documentWrapper, 'createElement').and.returnValue(label)

		spyOn(documentWrapper, 'createTextNode').and.returnValue(name)

		spyOn(createCheckbox, 'default').and.returnValue(checkbox)

		returnedLabel = createLabel.default({ houndstoothEffect })
	})

	it('returns the created label', () => {
		expect(returnedLabel).toBe(label)
	})

	it('adds a name to the label', () => {
		expect(children[ 0 ]).toBe(name)
	})

	it('makes the name using the houndstooth effect\'s name', () => {
		// tslint:disable-next-line:no-unsafe-any
		expect(documentWrapper.createTextNode).toHaveBeenCalledWith('mock tooth')
	})
})
