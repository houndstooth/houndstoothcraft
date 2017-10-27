import { InputElement } from '../../../../src/page'
import { PageElement } from '../../../../src/page'
import { Effect } from '../../../../src/store/types/Effect'
import * as createCheckbox from '../../../../src/ui/createCheckbox'
import { createLabel } from '../../../../src/ui/createLabel'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create label', () => {
	let returnedLabel: PageElement
	let label: PageElement
	const children: PageElement[] = []
	const checkbox: InputElement = {}
	const name: PageElement = {}
	const houndstoothEffect: Effect = { name: 'mock tooth' }
	beforeAll(() => {
		label = buildMockElement({ children })
		spyOn(window.document, 'createElement').and.returnValue(label)

		spyOn(window.document, 'createTextNode').and.returnValue(name)

		spyOn(createCheckbox, 'createCheckbox').and.returnValue(checkbox)

		returnedLabel = createLabel({ houndstoothEffect })
	})

	it('returns the created label', () => {
		expect(returnedLabel).toBe(label)
	})

	it('makes it so your cursor becomes a pointer when you hover over it', () => {
		if (!returnedLabel.style) {
			fail()
		}
		else {
			expect(returnedLabel.style.cursor).toBe('pointer')
		}
	})

	it('makes it so the labels all appear on separate lines', () => {
		if (!returnedLabel.style) {
			fail()
		}
		else {
			expect(returnedLabel.style.display).toBe('block')
		}
	})

	it('adds one checkbox to the label', () => {
		expect(children[ 0 ]).toBe(checkbox)
	})

	it('adds one name to the label, after the checkbox', () => {
		expect(children[ 1 ]).toBe(name)
	})

	it('makes the checkbox using the houndstooth effect', () => {
		expect(createCheckbox.createCheckbox).toHaveBeenCalledWith({ houndstoothEffect })
	})

	it('makes the name using the houndstooth effect\'s name', () => {
		expect(window.document.createTextNode).toHaveBeenCalledWith('mock tooth')
	})
})
