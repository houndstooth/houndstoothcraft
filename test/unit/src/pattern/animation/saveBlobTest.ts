// tslint:disable:no-unsafe-any

import { DataBlob, PageElement } from '../../../../../src/app/page/types'
import { saveBlob } from '../../../../../src/pattern/animation/saveBlob'
import Spy = jasmine.Spy
import * as windowWrapper from '../../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../../helpers/buildMockElement'

describe('save blob', () => {
	it('creates a download link and clicks it', () => {
		spyOn(windowWrapper.windowWrapper.URL, 'createObjectURL').and.returnValue('the url')

		const clickSpy: Spy = jasmine.createSpy('click')
		const link: PageElement = buildMockElement({ clickSpy })
		spyOn(windowWrapper.documentWrapper, 'createElement').and.returnValue(link)

		const appendChildSpy: Spy = spyOn(windowWrapper.documentWrapper.body, 'appendChild')

		spyOn(windowWrapper.windowWrapper.URL, 'revokeObjectURL')

		const blob: DataBlob = {}
		const name: string = 'whatever.png'
		saveBlob({ blob, name })

		expect(windowWrapper.windowWrapper.URL.createObjectURL).toHaveBeenCalledWith(blob)
		expect(appendChildSpy).toHaveBeenCalledWith(link)
		expect(link.style).toEqual({ display: 'none' })
		expect(link.href).toBe('the url')
		expect(link.download).toBe('whatever.png')
		expect(clickSpy).toHaveBeenCalled()
		expect(windowWrapper.windowWrapper.URL.revokeObjectURL).toHaveBeenCalledWith('the url')
	})
})
