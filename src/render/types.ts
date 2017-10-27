// tslint:disable-next-line:member-ordering
import { Px } from '../page'

interface Color {
	r?: number,
	g?: number,
	b?: number,
	a: number,

	[index: string]: number | undefined,
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