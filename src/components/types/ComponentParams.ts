import { ColorOptions } from './ColorOptions'
import { OutlineAsParam } from './OutlineAsParam'
import { TileOriginAndSize } from './TileOriginAndSize'

interface ComponentParams extends TileOriginAndSize, ColorOptions, OutlineAsParam {
}

export { ComponentParams }
