import { PageElement } from '../../../src/page/types/PageElement'
import { MockBody } from '../../types/MockBody'

const buildMockBody: (_?: { children?: PageElement[] }) => MockBody = (params: { children?: PageElement[] }) => {
	const { children = [] }: { children?: PageElement[] } = params || {}

	return { appendChild: (child: PageElement) => children.push(child) }
}

export { buildMockBody }
