import { MockBody } from '../../types/MockBody'

const buildMockBody: (_?: { mockChildren? }) => MockBody = (params = {}) => {
	const { mockChildren = [] } = params

	return { appendChild: child => mockChildren.push(child) }
}

export { buildMockBody }
