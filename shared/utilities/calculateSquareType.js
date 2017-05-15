import { STANDARD_SUPERTILE, SWITCHEROO_SUPERTILE } from '../common/constants'
import { SWITCHEROO } from '../common/customize'
import supertileEntry from './supertileEntry'

export default ({ x, y }) => supertileEntry({ x, y, supertile: SWITCHEROO ? SWITCHEROO_SUPERTILE : STANDARD_SUPERTILE })