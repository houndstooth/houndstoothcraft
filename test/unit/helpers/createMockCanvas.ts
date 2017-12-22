import createMockContext from './createMockContext'
import createMockElement from './createMockElement'
import { MockCanvas, MockContext } from './types'

const createMockCanvas: (_?: { classList?: string[], context?: MockContext }) => MockCanvas =
	({ context = createMockContext(), classList }: { classList?: string[], context?: MockContext } = {}): MockCanvas =>
		({
			...createMockElement({ classList }),
			getContext: (contextType: string): CanvasRenderingContext2D | undefined =>
				contextType === '2d' ? context as CanvasRenderingContext2D : undefined,
		})

export default createMockCanvas
