import { patternState } from '../patternState'

const shouldRefreshCanvas: () => boolean = (): boolean => patternState.animationSettings.refreshCanvas

export default shouldRefreshCanvas
