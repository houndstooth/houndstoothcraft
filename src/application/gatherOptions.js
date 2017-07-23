import store from '../../store'

export default ({ address }) => {
	let options = {}
	store.currentState.mainHoundstooth.basePattern.gatherOptions && Object.keys(store.currentState.mainHoundstooth.basePattern.gatherOptions).forEach(key => {
		options = Object.assign({}, options, store.currentState.mainHoundstooth.basePattern.gatherOptions[ key ]({ address }))
	})
	return options
}
