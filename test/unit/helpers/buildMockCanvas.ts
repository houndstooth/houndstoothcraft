import buildMockElement from './buildMockElement'
import MockCanvas from '../../types/MockCanvas'
import MockContext from '../../types/MockContext'

const buildMockCanvas: {
	({}: { mockContext?: MockContext, mockClassList?: string[] }): MockCanvas,
} = ({ mockClassList, mockContext }) =>
	Object.assign(buildMockElement({ mockClassList }), {
		getContext: contextType => contextType === '2d' ? mockContext : undefined,
	})

export default buildMockCanvas
