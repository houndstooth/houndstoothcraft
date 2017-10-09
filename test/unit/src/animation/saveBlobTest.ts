import saveBlob from '../../../../src/animation/saveBlob'
import * as windowWrapper from '../../../../src/utilities/windowWrapper'
import buildMockElement from '../../helpers/buildMockElement'

describe('save blob', () => {
	it('creates a download link and clicks it', () => {
		spyOn(windowWrapper.window.URL, 'createObjectURL').and.returnValue('the url')

		const clickSpy = jasmine.createSpy('click')
		const mockLink = buildMockElement({ clickSpy })
		spyOn(windowWrapper.document, 'createElement').and.returnValue(mockLink)

		const appendChildSpy = spyOn(windowWrapper.document.body, 'appendChild')

		spyOn(windowWrapper.window.URL, 'revokeObjectURL')

		const blob = {}
		const name = 'whatever.png'
		saveBlob(blob, name)

		expect(windowWrapper.window.URL.createObjectURL).toHaveBeenCalledWith(blob)
		expect(appendChildSpy).toHaveBeenCalledWith(mockLink)
		expect(mockLink.style).toBe('display: none')
		expect(mockLink.href).toBe('the url')
		expect(mockLink.download).toBe('whatever.png')
		expect(clickSpy).toHaveBeenCalled()
		expect(windowWrapper.window.URL.revokeObjectURL).toHaveBeenCalledWith('the url')
	})
})
