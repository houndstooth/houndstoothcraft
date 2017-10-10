import Color from './Color'

const parseColor: { ({}: Color): string } = ({ r, g, b, a }) => `rgba(${  [ r, g, b, a ].join(',')  })`

export default parseColor
