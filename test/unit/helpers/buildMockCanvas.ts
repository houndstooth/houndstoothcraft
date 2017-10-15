import buildMockElement from './buildMockElement'
import { MockContext } from '../../helpers/types'
import { MockElement } from './types'

interface MockCanvas extends MockElement {
	getContext: { (contextType: string): MockContext }
}

type BuildMockCanvas = { ({}: { mockContext?: MockContext, mockClassList?: string[] }): MockCanvas }

const buildMockCanvas: BuildMockCanvas = ({ mockClassList, mockContext }) =>
	Object.assign(buildMockElement({ mockClassList }), {
		getContext: contextType => contextType === '2d' ? mockContext : undefined,
	})

export default buildMockCanvas
