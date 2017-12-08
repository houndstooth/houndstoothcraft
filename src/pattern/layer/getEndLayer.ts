import { get } from '../patternState'
import { Layer } from './types'

const getEndLayer: () => Layer = (): Layer => get('endLayer')

export default getEndLayer
