import { STANDARD_SUPERTILE } from '../application/constants'
import { GONGRAM_SUPERTILE } from '../../gongram/gongramConstants'
import state from '../application/state'

export default () => state.shared.gongramColors ? GONGRAM_SUPERTILE : STANDARD_SUPERTILE
