import { PageElement } from '../../../src/page'
import { MockBody } from '../../helpers/types'

const buildMockBody: (_?: { children?: PageElement[] }) => MockBody =
	({ children = [] }: { children?: PageElement[] }): MockBody => ({
		appendChild: (child: PageElement): number => children.push(child),
		style: {}
	})

export { buildMockBody }
