import buildMockElement from './buildMockElement'
import { MockContext } from '../../helpers/types'
import { MockElement } from './types'

interface MockCanvas extends MockElement {

}

type BuildMockCanvas = { ({}: { mockContext?: MockContext, mockClassList?: string[] }): MockCanvas }

const buildMockCanvas: BuildMockCanvas = ({ mockClassList, mockContext }) => {
	return Object.assign(buildMockElement({ mockClassList }), {
		getContext: contextType => contextType === '2d' ? mockContext : null,
	})
}

export default buildMockCanvas
