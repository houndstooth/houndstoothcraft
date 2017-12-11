import { ConditionFunction } from '../../utilities'
import { get } from '../patternState'

const shouldRefreshCanvas: ConditionFunction = (): boolean => get('refreshCanvas')

export default shouldRefreshCanvas
