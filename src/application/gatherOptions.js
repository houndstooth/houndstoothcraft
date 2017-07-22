export default ({ address }) => {
	let options = {}
	currentState.builtPattern.base.gatherOptions && Object.keys(currentState.builtPattern.base.gatherOptions).forEach(key => {
		options = Object.assign({}, options, currentState.builtPattern.base.gatherOptions[ key ]({ address }))
	})
	return options
}
