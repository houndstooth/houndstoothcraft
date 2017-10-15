import buildMockElement from './buildMockElement'
import MockCanvas from '../../types/MockCanvas'
import MockContext from '../../types/MockContext'

type BuildMockCanvas = { ({}: { mockContext?: MockContext, mockClassList?: string[] }): MockCanvas }

const buildMockCanvas: BuildMockCanvas = ({ mockClassList, mockContext }) =>
	Object.assign(buildMockElement({ mockClassList }), {
		getContext: contextType => contextType === '2d' ? mockContext : undefined,
	})

export default buildMockCanvas
