import Units from '../../components/types/Units'

enum _CoordinateBrand {}
type Coordinate = _CoordinateBrand & Units[]

export default Coordinate
