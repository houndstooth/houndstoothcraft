import { PageElement } from '../../../src'
import { MockElement } from '../../helpers'

const buildMockBody: (_?: { children?: PageElement[] }) => MockElement =
	({ children = [] }: { children?: PageElement[] } = {}): MockElement => ({
		appendChild: (child: PageElement): number => children.push(child),
		style: {},
	})

export { buildMockBody }
