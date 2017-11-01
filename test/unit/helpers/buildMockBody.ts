import { PageElement } from '../../../src/page'
import { MockElement } from '../../helpers/types'

const buildMockBody: (_?: { children?: PageElement[] }) => MockElement =
	({ children = [] }: { children?: PageElement[] } = {}): MockElement => ({
		appendChild: (child: PageElement): number => children.push(child),
		style: {},
	})

export { buildMockBody }
