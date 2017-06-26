export default ({ address }) => {
	let options = {}
	if (state.gatherOptions) {
		Object.keys(state.gatherOptions).forEach(key => {
			options = Object.assign({}, options, state.gatherOptions[ key ]({ address }))
		})
	}
	return options
}
