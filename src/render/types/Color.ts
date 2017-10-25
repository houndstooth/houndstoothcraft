// tslint:disable:member-ordering
interface Color {
	r?: number,
	g?: number,
	b?: number,
	a: number,

	[index: string]: number | undefined,
}

export { Color }
