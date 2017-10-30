import { Context } from '../../../src/page'
import { buildMockContext } from '../../helpers/buildMockContext'
import { MockCanvas } from '../../types/MockCanvas'
import { MockContext } from '../../types/MockContext'
import { buildMockElement } from './buildMockElement'

const buildMockCanvas: (_?: { classList?: string[], context?: MockContext }) => MockCanvas =
	({ context = buildMockContext(), classList }: { classList?: string[], context?: MockContext } = {}): MockCanvas =>
		Object.assign(buildMockElement({ classList }), {
			getContext: (contextType: string): Context | undefined => contextType === '2d' ? context : undefined,
		})

export { buildMockCanvas }
