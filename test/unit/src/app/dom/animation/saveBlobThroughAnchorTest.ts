// tslint:disable:no-unsafe-any

import { globalWrapper, saveBlobThroughAnchor } from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy
import { createMockElement } from '../../../../helpers'

describe('save blob through anchor', () => {
	it('creates a download link and clicks it', () => {
		const subject: (_: { blob: Blob, name: string }) => void = saveBlobThroughAnchor.default
		spyOn(globalWrapper.window.URL, 'createObjectURL').and.returnValue('the url')

		const clickSpy: Spy = jasmine.createSpy('click')
		const link: HTMLAnchorElement = createMockElement({ clickSpy }) as HTMLAnchorElement
		spyOn(globalWrapper.document, 'createElement').and.returnValue(link)

		spyOn(globalWrapper.window.URL, 'revokeObjectURL')

		// tslint:disable-next-line:no-object-literal-type-assertion
		const blob: Blob = {} as Blob
		const name: string = 'whatever.png'
		subject({ blob, name })

		expect(globalWrapper.window.URL.createObjectURL).toHaveBeenCalledWith(blob)
		expect(link.style.display).toBe('none')
		expect(link.href).toBe('the url')
		expect(link.download).toBe('whatever.png')
		expect(clickSpy).toHaveBeenCalled()
		expect(globalWrapper.window.URL.revokeObjectURL).toHaveBeenCalledWith('the url')
	})
})
