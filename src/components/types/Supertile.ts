import { ShapeColorIndex } from './ShapeColorIndex'

enum _SupertileBrand {}
type Supertile = _SupertileBrand & ShapeColorIndex[][][]

export { Supertile }
