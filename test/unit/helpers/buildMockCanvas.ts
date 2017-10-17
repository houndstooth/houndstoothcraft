import MockCanvas from '../../types/MockCanvas'
import MockContext from '../../types/MockContext'
import buildMockElement from './buildMockElement'

const buildMockCanvas: {
	({}: { mockClassList?: string[], mockContext?: MockContext }): MockCanvas,
} = ({ mockContext, mockClassList }) =>
	Object.assign(buildMockElement({ mockClassList }), {
		getContext: contextType => contextType === '2d' ? mockContext : undefined,
	})

export default buildMockCanvas
