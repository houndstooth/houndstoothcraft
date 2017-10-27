import { PageElement } from '../../../src/page'
import { MockBody } from '../../types/MockBody'

const buildMockBody: (_?: { children?: PageElement[] }) => MockBody =
	({ children = [] }: { children?: PageElement[] }): MockBody =>
		({ appendChild: (child: PageElement): number => children.push(child) })

export { buildMockBody }
