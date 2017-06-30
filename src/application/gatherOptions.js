export default ({ address }) => {
	let options = {}
	if (settings.initial.gatherOptions) {
		Object.keys(settings.initial.gatherOptions).forEach(key => {
			options = Object.assign({}, options, settings.initial.gatherOptions[ key ]({ address }))
		})
	}
	return options
}
