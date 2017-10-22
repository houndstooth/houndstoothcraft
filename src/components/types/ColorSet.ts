import { Color } from '../../render'

enum _ColorSetBrand {}
type ColorSet = _ColorSetBrand & Color[]

export { ColorSet }
