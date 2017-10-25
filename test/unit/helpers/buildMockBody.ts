import { PageElement } from '../../../src/page/types/PageElement'
import { MockBody } from '../../types/MockBody'

const buildMockBody: (_?: { mockChildren?: PageElement[] }) => MockBody = (params = {}) => {
	const { mockChildren = [] } = params

	return { appendChild: (child: PageElement) => mockChildren.push(child) }
}

export { buildMockBody }
