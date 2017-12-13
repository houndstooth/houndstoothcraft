import { Px } from '../dom'

enum _PathBrand {}
type Path = _PathBrand & Pixel[]

enum _PixelBrand {}
type Pixel = _PixelBrand & Px[]

interface RenderState {
	contexts: CanvasRenderingContext2D[],
	mixedDownContext: CanvasRenderingContext2D,
}

export {
	Path,
	Pixel,
	RenderState,
}
