import { Color } from '../../types'

const parseColor: (_: Color) => string = ({ r, g, b, a }: Color): string => `rgba(${  [ r, g, b, a ].join(',')  })`

export default parseColor
