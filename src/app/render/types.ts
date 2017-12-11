import { Px } from '../dom'

enum _PathBrand {}
type Path = _PathBrand & Pixel[]

enum _PixelBrand {}
type Pixel = _PixelBrand & Px[]

type DataBlob = Blob | {}

interface RenderState {
	contexts: CanvasRenderingContext2D[],
	mixedDownContext: CanvasRenderingContext2D,
}

export {
	DataBlob,
	Path,
	Pixel,
	RenderState,
}
