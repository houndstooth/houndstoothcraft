import { Context } from '../../../src'
import { buildMockContext, MockCanvas, MockContext } from '../../helpers'
import buildMockElement from './buildMockElement'

const buildMockCanvas: (_?: { classList?: string[], context?: MockContext }) => MockCanvas =
	({ context = buildMockContext(), classList }: { classList?: string[], context?: MockContext } = {}): MockCanvas =>
		Object.assign(buildMockElement({ classList }), {
			getContext: (contextType: string): Context | undefined => contextType === '2d' ? context : undefined,
		})

export default buildMockCanvas
