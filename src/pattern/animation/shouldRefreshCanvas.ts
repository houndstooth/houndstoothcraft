import { ConditionFunction } from '../../utilities'
import { patternState } from '../patternState'

const shouldRefreshCanvas: ConditionFunction = (): boolean => patternState.animationSettings.refreshCanvas

export default shouldRefreshCanvas
