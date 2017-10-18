import * as createCheckbox from '../../../../src/ui/createCheckbox'
import { createLabel } from '../../../../src/ui/createLabel'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('create label', () => {
	let returnedLabel
	let mockLabel
	const mockChildren = []
	const mockCheckbox = {}
	const mockName = {}
	const mockHoundstoothEffect = { name: 'mock tooth' }
	beforeAll(() => {
		mockLabel = buildMockElement({ mockChildren })
		spyOn(window.document, 'createElement').and.returnValue(mockLabel)

		spyOn(window.document, 'createTextNode').and.returnValue(mockName)

		spyOn(createCheckbox, 'createCheckbox').and.returnValue(mockCheckbox)

		returnedLabel = createLabel({ houndstoothEffect: mockHoundstoothEffect })
	})

	it('returns the created label', () => {
		expect(returnedLabel).toBe(mockLabel)
	})

	it('makes it so your cursor becomes a pointer when you hover over it', () => {
		expect(returnedLabel.style.cursor).toBe('pointer')
	})

	it('makes it so the labels all appear on separate lines', () => {
		expect(returnedLabel.style.display).toBe('block')
	})

	it('adds one checkbox to the label', () => {
		expect(mockChildren[ 0 ]).toBe(mockCheckbox)
	})

	it('adds one name to the label, after the checkbox', () => {
		expect(mockChildren[ 1 ]).toBe(mockName)
	})

	it('makes the checkbox using the houndstooth effect', () => {
		expect(createCheckbox.createCheckbox).toHaveBeenCalledWith({ houndstoothEffect: mockHoundstoothEffect })
	})

	it('makes the name using the houndstooth effect\'s name', () => {
		expect(window.document.createTextNode).toHaveBeenCalledWith('mock tooth')
	})
})
