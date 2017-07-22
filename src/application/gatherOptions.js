import store from '../../store'

export default ({ address }) => {
	let options = {}
	store.currentState.builtPattern.base.gatherOptions && Object.keys(store.currentState.builtPattern.base.gatherOptions).forEach(key => {
		options = Object.assign({}, options, store.currentState.builtPattern.base.gatherOptions[ key ]({ address }))
	})
	return options
}
