import { PageElement } from '../../../../src/page/types/PageElement'
import { warn } from '../../../../src/ui/warn'
import * as window from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('warn', () => {
	it('adds warnings to the warnings container', () => {
		spyOn(window.document, 'createElement').and.callFake(() => ({}))

		const children: PageElement[] = []
		const warningsContainer: PageElement = buildMockElement({ children })
		spyOn(window.document, 'querySelector').and.returnValue(warningsContainer)

		warn('watch out!')
		warn('my man!')

		expect(children[ 0 ].innerHTML).toEqual('watch out!')
		expect(children[ 1 ].innerHTML).toEqual('my man!')
	})
})
