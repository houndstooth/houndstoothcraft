export default ({ address }) => {
	let options = {}
	current.settings.initial.gatherOptions && Object.keys(current.settings.initial.gatherOptions).forEach(key => {
		options = Object.assign({}, options, current.settings.initial.gatherOptions[ key ]({ address }))
	})
	return options
}
