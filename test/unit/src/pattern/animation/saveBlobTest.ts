// tslint:disable:no-unsafe-any

import { DataBlob, documentWrapper, PageElement, saveBlob, windowWrapper } from '../../../../../src'
import Spy = jasmine.Spy
import { buildMockElement } from '../../../helpers'

describe('save blob', () => {
	it('creates a download link and clicks it', () => {
		spyOn(windowWrapper.URL, 'createObjectURL').and.returnValue('the url')

		const clickSpy: Spy = jasmine.createSpy('click')
		const link: PageElement = buildMockElement({ clickSpy })
		spyOn(documentWrapper, 'createElement').and.returnValue(link)

		const appendChildSpy: Spy = spyOn(documentWrapper.body, 'appendChild')

		spyOn(windowWrapper.URL, 'revokeObjectURL')

		const blob: DataBlob = {}
		const name: string = 'whatever.png'
		saveBlob.main({ blob, name })

		expect(windowWrapper.URL.createObjectURL).toHaveBeenCalledWith(blob)
		expect(appendChildSpy).toHaveBeenCalledWith(link)
		expect(link.style).toEqual({ display: 'none' })
		expect(link.href).toBe('the url')
		expect(link.download).toBe('whatever.png')
		expect(clickSpy).toHaveBeenCalled()
		expect(windowWrapper.URL.revokeObjectURL).toHaveBeenCalledWith('the url')
	})
})
