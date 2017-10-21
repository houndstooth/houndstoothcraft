import { Unit } from '../../components/types/Unit'

enum _CoordinateBrand {}
type Coordinate = _CoordinateBrand & Unit[]

export { Coordinate }
