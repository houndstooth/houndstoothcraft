import { MockCanvas } from '../../types/MockCanvas'
import { MockContext } from '../../types/MockContext'
import { buildMockElement } from './buildMockElement'

const buildMockCanvas: (_: {
	classList?: string[], context?: MockContext,
}) => MockCanvas = ({ context, classList }: {classList?: string[], context?: MockContext}) =>
	Object.assign(buildMockElement({ classList }), {
		getContext: (contextType: string) => contextType === '2d' ? context : undefined,
	})

export { buildMockCanvas }
