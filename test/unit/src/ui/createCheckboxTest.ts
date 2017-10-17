import * as buildEffectToggleClickHandler from '../../../../src/ui/buildEffectToggleClickHandler'
import createCheckbox from '../../../../src/ui/createCheckbox'
import * as window from '../../../../src/utilities/windowWrapper'
import noop from '../../../helpers/noop'
import buildMockElement from '../../helpers/buildMockElement'

describe('create checkbox', () => {
	let returnedCheckbox
	let mockCheckbox
	const mockClassList = []
	const mockAttributeObject = { type: '' }
	const mockClickHandler = noop
	const mockHoundstoothEffect = { name: 'mock tooth' }
	beforeAll(() => {
		mockCheckbox = buildMockElement({ mockClassList, mockAttributeObject })
		spyOn(window.document, 'createElement').and.returnValue(mockCheckbox)

		spyOn(buildEffectToggleClickHandler, 'default').and.returnValue(mockClickHandler)

		returnedCheckbox = createCheckbox({ houndstoothEffect: mockHoundstoothEffect })
	})

	it('returns the created label', () => {
		expect(returnedCheckbox).toBe(mockCheckbox)
	})

	it('makes it so your cursor becomes a pointer when you hover over it', () => {
		expect(returnedCheckbox.style.cursor).toBe('pointer')
	})

	it('makes the checkbox using the houndstooth effect', () => {
		expect(buildEffectToggleClickHandler.default).toHaveBeenCalledWith({
			checkbox: mockCheckbox,
			houndstoothEffect: mockHoundstoothEffect,
		})
	})

	it('gives the checkbox a class which is the kebab-cased version of the houndstooth effect\'s name', () => {
		expect(mockClassList[ 0 ]).toBe('mock-tooth')
	})

	it('assigns a click handler to the checkbox', () => {
		expect(returnedCheckbox.onclick).toBe(mockClickHandler)
	})

	it('sets the type to checkbox', () => {
		expect(mockAttributeObject.type).toBe('checkbox')
	})
})
