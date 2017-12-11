// tslint:disable:no-unsafe-any

import { DataBlob, globalWrapper, saveBlob } from '../../../../../src/indexForTest'
import Spy = jasmine.Spy
import { buildMockElement } from '../../../helpers'

const subject: (_: { blob: DataBlob, name: string }) => void = saveBlob.default

describe('save blob', () => {
	it('creates a download link and clicks it', () => {
		spyOn(globalWrapper.window.URL, 'createObjectURL').and.returnValue('the url')

		const clickSpy: Spy = jasmine.createSpy('click')
		const link: HTMLAnchorElement = buildMockElement({ clickSpy }) as HTMLAnchorElement
		spyOn(globalWrapper.document, 'createElement').and.returnValue(link)

		const appendChildSpy: Spy = spyOn(globalWrapper.document.body, 'appendChild')

		spyOn(globalWrapper.window.URL, 'revokeObjectURL')

		const blob: DataBlob = {}
		const name: string = 'whatever.png'
		subject({ blob, name })

		expect(globalWrapper.window.URL.createObjectURL).toHaveBeenCalledWith(blob)
		expect(appendChildSpy).toHaveBeenCalledWith(link)
		expect(link.style.display).toBe('none')
		expect(link.href).toBe('the url')
		expect(link.download).toBe('whatever.png')
		expect(clickSpy).toHaveBeenCalled()
		expect(globalWrapper.window.URL.revokeObjectURL).toHaveBeenCalledWith('the url')
	})
})
