import { Color } from './types'

const parseColor: { ({}: Color): string } = ({ r, g, b, a }) => `rgba(${  [ r, g, b, a ].join(',')  })`

export default parseColor
