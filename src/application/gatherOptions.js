import store from '../../store'

export default ({ gridAddress }) => {
	let options = {}
	store.mainHoundstooth.basePattern.gatherOptions && Object.keys(store.mainHoundstooth.basePattern.gatherOptions).forEach(key => {
		options = Object.assign({}, options, store.mainHoundstooth.basePattern.gatherOptions[ key ]({ gridAddress }))
	})
	return options
}
