import buildMockElement from './buildMockElement'

export default ({ mockContext, mockClassList } : { mockContext?, mockClassList? } = {}) => {
	return Object.assign(buildMockElement({ mockClassList }), {
		getContext: contextType => contextType === '2d' ? mockContext : null,
	})
}
