import { Dimension } from '../../page'

enum _PixelBrand {}
type Pixel = _PixelBrand & Dimension[]

export { Pixel }
