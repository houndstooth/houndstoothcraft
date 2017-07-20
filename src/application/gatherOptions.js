export default ({ address }) => {
	let options = {}
	currentState.settings.base.gatherOptions && Object.keys(currentState.settings.base.gatherOptions).forEach(key => {
		options = Object.assign({}, options, currentState.settings.base.gatherOptions[ key ]({ address }))
	})
	return options
}
