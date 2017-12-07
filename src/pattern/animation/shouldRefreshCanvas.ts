import { ConditionFunction } from '../../app'
import { get } from '../patternState'

const shouldRefreshCanvas: ConditionFunction = (): boolean => get('refreshCanvas')

export default shouldRefreshCanvas
