import { Grid } from './Grid'
import { ShapeColorIndex } from './ShapeColorIndex'

enum _SupertileBrand {}
type Supertile = _SupertileBrand & Grid<ShapeColorIndex[]>

export { Supertile }
