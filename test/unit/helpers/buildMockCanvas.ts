import buildMockElement from './buildMockElement'
import MockCanvas from '../../types/MockCanvas'
import MockContext from '../../types/MockContext'

const buildMockCanvas: {
	({}: { mockClassList?: string[], mockContext?: MockContext }): MockCanvas,
} = ({ mockContext, mockClassList }) =>
	Object.assign(buildMockElement({ mockClassList }), {
		getContext: contextType => contextType === '2d' ? mockContext : undefined,
	})

export default buildMockCanvas
