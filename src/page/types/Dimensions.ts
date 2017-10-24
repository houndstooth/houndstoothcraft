import { Px } from './Px'

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

export { Dimensions }
