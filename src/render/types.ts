import { Px } from '../page'

// tslint:disable:member-ordering
interface Color {
	readonly r?: number,
	readonly g?: number,
	readonly b?: number,
	readonly a: number,
	readonly [index: string]: number | undefined,
}

enum _PathBrand {}
type Path = _PathBrand & Pixel[]

enum _PixelBrand {}
type Pixel = _PixelBrand & Px[]

export {
	Color,
	Path,
	Pixel,
}
