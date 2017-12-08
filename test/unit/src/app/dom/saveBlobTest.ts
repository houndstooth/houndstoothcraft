// tslint:disable:no-unsafe-any

import { DataBlob, documentWrapper, saveBlob, windowWrapper } from '../../../../../src'
import Spy = jasmine.Spy
import { buildMockElement } from '../../../helpers'

const subject: (_: { blob: DataBlob, name: string }) => void = saveBlob.default

describe('save blob', () => {
	it('creates a download link and clicks it', () => {
		spyOn(windowWrapper.URL, 'createObjectURL').and.returnValue('the url')

		const clickSpy: Spy = jasmine.createSpy('click')
		const link: HTMLAnchorElement = buildMockElement({ clickSpy }) as HTMLAnchorElement
		spyOn(documentWrapper, 'createElement').and.returnValue(link)

		const appendChildSpy: Spy = spyOn(documentWrapper.body, 'appendChild')

		spyOn(windowWrapper.URL, 'revokeObjectURL')

		const blob: DataBlob = {}
		const name: string = 'whatever.png'
		subject({ blob, name })

		expect(windowWrapper.URL.createObjectURL).toHaveBeenCalledWith(blob)
		expect(appendChildSpy).toHaveBeenCalledWith(link)
		expect(link.style.display).toBe('none')
		expect(link.href).toBe('the url')
		expect(link.download).toBe('whatever.png')
		expect(clickSpy).toHaveBeenCalled()
		expect(windowWrapper.URL.revokeObjectURL).toHaveBeenCalledWith('the url')
	})
})
