import { buildMockElement } from '../unit'
import buildMockContext from './buildMockContext'
import { MockCanvas, MockContext } from './types'

const buildMockCanvas: (_?: { classList?: string[], context?: MockContext }) => MockCanvas =
	({ context = buildMockContext(), classList }: { classList?: string[], context?: MockContext } = {}): MockCanvas =>
		Object.assign(buildMockElement({ classList }), {
			getContext: (contextType: string): CanvasRenderingContext2D | undefined => contextType === '2d' ? context as CanvasRenderingContext2D : undefined,
		})

export default buildMockCanvas
