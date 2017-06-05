export default ({ orientations }) => {
	for (let i = 0; i < orientations.length - 1; i++) {
		if (orientations[ i ] !== orientations[ i + 1 ]) return false
	}
	return true
}
