import { saveBlob } from '../../../../src/animation/saveBlob'
import { DataBlob } from '../../../../src/page'
import Spy = jasmine.Spy
import { PageElement } from '../../../../src/page'
import * as windowWrapper from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('save blob', () => {
	it('creates a download link and clicks it', () => {
		spyOn(windowWrapper.window.URL, 'createObjectURL').and.returnValue('the url')

		const clickSpy: Spy = jasmine.createSpy('click')
		const link: PageElement = buildMockElement({ clickSpy })
		spyOn(windowWrapper.document, 'createElement').and.returnValue(link)

		const appendChildSpy: Spy = spyOn(windowWrapper.document.body, 'appendChild')

		spyOn(windowWrapper.window.URL, 'revokeObjectURL')

		const blob: DataBlob = {}
		const name: string = 'whatever.png'
		saveBlob({ blob, name })

		expect(windowWrapper.window.URL.createObjectURL).toHaveBeenCalledWith(blob)
		expect(appendChildSpy).toHaveBeenCalledWith(link)
		expect(link.style).toEqual({ display: 'none' })
		expect(link.href).toBe('the url')
		expect(link.download).toBe('whatever.png')
		expect(clickSpy).toHaveBeenCalled()
		expect(windowWrapper.window.URL.revokeObjectURL).toHaveBeenCalledWith('the url')
	})
})
