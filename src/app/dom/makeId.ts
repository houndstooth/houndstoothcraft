const makeId: (_: string) => string =
	(name: string): string =>
		name.replace(/ /g, '-')

export default makeId
