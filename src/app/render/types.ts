import { Px } from '../page'

enum _PathBrand {}
type Path = _PathBrand & Pixel[]

enum _PixelBrand {}
type Pixel = _PixelBrand & Px[]

export {
	Path,
	Pixel,
}
