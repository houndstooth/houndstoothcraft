import buildMockContext from './buildMockContext'
import buildMockElement from './buildMockElement'
import { MockCanvas, MockContext } from './types'

const buildMockCanvas: (_?: { classList?: string[], context?: MockContext }) => MockCanvas =
	({ context = buildMockContext(), classList }: { classList?: string[], context?: MockContext } = {}): MockCanvas =>
		({
			...buildMockElement({ classList }),
			getContext: (contextType: string): CanvasRenderingContext2D | undefined =>
				contextType === '2d' ? context as CanvasRenderingContext2D : undefined,
		})

export default buildMockCanvas
