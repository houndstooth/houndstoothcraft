import store from '../../store'

export default ({ gridAddress }) => {
	let options = {}
	store.currentState.mainHoundstooth.basePattern.gatherOptions && Object.keys(store.currentState.mainHoundstooth.basePattern.gatherOptions).forEach(key => {
		options = Object.assign({}, options, store.currentState.mainHoundstooth.basePattern.gatherOptions[ key ]({ gridAddress }))
	})
	return options
}
