import { STANDARD_SUPERTILE } from '../common/constants'
import { GONGRAM_SUPERTILE } from '../../gongram/constants'
import state from '../../state'

export default () => state.shared.gongramColors ? GONGRAM_SUPERTILE : STANDARD_SUPERTILE
