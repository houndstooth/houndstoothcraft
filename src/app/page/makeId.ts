const makeId: (name: string) => string =
	(name: string): string =>
		name.replace(/ /g, '-')

export default makeId
